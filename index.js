"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const nb = require("@jupyterlab/notebook");

const IS_MAC = !!navigator.platform.match(/Mac/i);

class JupyterLabSublime {

    constructor(app, tracker) {
        this.app = app;
        this.tracker = tracker;
        this.addCommands();
        this.onAcitveCellChanged();
        this.tracker.activeCellChanged.connect(this.onAcitveCellChanged, this);
    }

    addCommands() {
        const { commands } = this.app;
        const self = this;
        function editorExec(id) {
            self.tracker.activeCell.editor.editor.execCommand(id);
        }
        // Manage Escape collision
        // TODO: Check if use has Escape set for command mode
        commands.addCommand("sublime:exit-editor", {
            execute: () => {
                editorExec("singleSelectionTop");
                commands.execute("notebook:enter-command-mode");
            },
            label: "Exit Editor",
        });
        commands.addKeyBinding({
            command: "sublime:exit-editor",
            keys: ["Escape"],
            selector: ".jp-Notebook-cell .CodeMirror-focused",
        });
        // Manage Shift-Tab collision
        commands.addCommand("sublime:indent-less-slash-tooltip", {
            execute: () => {
                if (!this.tracker.activeCell.editor.host.classList.contains("jp-mod-completer-enabled")) {
                    editorExec("indentLess");
                }
                else {
                    commands.execute("tooltip:launch-notebook");
                }
            },
            label: "Indent less or tooltip",
        });
        commands.addKeyBinding({
            command: "sublime:indent-less-slash-tooltip",
            keys: ["Shift Tab"],
            selector: ".jp-Notebook-cell .CodeMirror-focused",
        });
        // Manage Shift-Ctr-L collision
        commands.addCommand("sublime:split-selection-by-lLine", {
            execute: () => {
                editorExec("splitSelectionByLine");
            },
            label: "Split selection by line",
        });
        if (IS_MAC) {
            commands.addKeyBinding({
                command: "sublime:split-selection-by-lLine",
                keys: ["Accel Shift L"],
                selector: ".jp-Notebook-cell .CodeMirror-focused",
            });
        }
        else {
            commands.addKeyBinding({
                command: "sublime:split-selection-by-lLine",
                keys: ["Ctrl Shift L"],
                selector: ".jp-Notebook-cell .CodeMirror-focused",
            });
        }
        // Manage Ctrl-M collision
        commands.addCommand("sublime:go-to-bracket", {
            execute: () => {
                editorExec("goToBracket");
            },
            label: "Go to bracket",
        });
        commands.addKeyBinding({
            command: "sublime:go-to-bracket",
            keys: ["Ctrl M"],
            selector: ".jp-Notebook-cell .CodeMirror-focused",
        });
        // Manage Shift-Ctrl-D collision
        commands.addCommand("sublime:duplicate-line", {
            execute: () => {
                editorExec("duplicateLine");
            },
            label: "Duplicate line",
        });
        if (IS_MAC) {
            commands.addKeyBinding({
                command: "sublime:duplicate-line",
                keys: ["Accel Shift D"],
                selector: ".jp-Notebook-cell .CodeMirror-focused",
            });
        }
        else {
            commands.addKeyBinding({
                command: "sublime:duplicate-line",
                keys: ["Ctrl Shift D"],
                selector: ".jp-Notebook-cell .CodeMirror-focused",
            });
        }
        // Repurpose Ctrl-Up
        commands.addCommand("sublime:add-cursor-to-prev-line", {
            execute: () => {
                editorExec("addCursorToPrevLine");
            },
            label: "Add cursor to previous line",
        });
        commands.addKeyBinding({
            command: "sublime:add-cursor-to-prev-line",
            keys: ["Ctrl ArrowUp"],
            selector: ".jp-Notebook-cell .CodeMirror-focused",
        });
        // Repurpose Ctrl-Down
        commands.addCommand("sublime:add-cursor-to-next-line", {
            execute: () => {
                editorExec("addCursorToNextLine");
            },
            label: "Add cursor to next line",
        });
        commands.addKeyBinding({
            command: "sublime:add-cursor-to-next-line",
            keys: ["Ctrl ArrowDown"],
            selector: ".jp-Notebook-cell .CodeMirror-focused",
        });
    }

    onAcitveCellChanged() {
        const activeCell = this.tracker.activeCell;
        if (activeCell !== null) {
            activeCell.editor.setOption("keyMap", "sublime");
        }
    }
}

/**
 * Initialization data for the jupyterlab_sublime extension.
 */
const extension = {
    activate: (app, tracker) => {
        new JupyterLabSublime(app, tracker);
        console.log("JupyterLab extension jupyterlab_sublime is activated!");
    },
    autoStart: true,
    id: "jupyterlab_sublime",
    requires: [nb.INotebookTracker],
};

exports.default = extension;
