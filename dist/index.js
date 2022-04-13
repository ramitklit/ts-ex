#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var inquirer = __importStar(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var template = __importStar(require("./utils/template"));
var shell = __importStar(require("shelljs"));
var templates = fs.readdirSync(path.join(__dirname, 'templates'));
var questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please input a new project name (tsex-basic)? :',
    },
    {
        name: 'template',
        type: 'list',
        message: 'What template would you like to use?',
        choices: templates,
    },
];
var CURR_DIR = process.cwd();
inquirer.prompt(questions).then(function (answers) {
    var projectChoice = answers['template'];
    var projectName = answers['name'] || 'tsex-basic';
    //@ts-ignore
    var templatePath = path.join(__dirname, 'templates', projectChoice);
    //@ts-ignore
    var tartgetPath = path.join(CURR_DIR, projectName);
    var options = {
        //@ts-ignore
        projectName: projectName,
        //@ts-ignore
        templateName: projectChoice,
        templatePath: templatePath,
        tartgetPath: tartgetPath,
    };
    if (!createProject(tartgetPath)) {
        return;
    }
    //@ts-ignore
    createDirectoryContents(templatePath, projectName);
    postProcess(options);
});
function createProject(projectPath) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk_1.default.red("Error: Something went wrong."));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}
var SKIP_FILES = ['node_modules', '.template.json', 'yarn.lock'];
function createDirectoryContents(templatePath, projectName) {
    // read all files/folders (1 level) from template folder
    var filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(function (file) {
        var origFilePath = path.join(templatePath, file);
        // get stats about the current file
        var stats = fs.statSync(origFilePath);
        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1)
            return;
        if (stats.isFile()) {
            // read file content and transform it using template engine
            var contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template.render(contents, { projectName: projectName });
            // write file to destination folder
            var writePath = path.join(CURR_DIR, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
}
function postProcess(options) {
    var isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
    if (isNode) {
        shell.cd(options.tartgetPath);
        var result = shell.exec('yarn install');
        if (result.code !== 0) {
            return false;
        }
    }
    return true;
}
