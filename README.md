# jupyterlab_sublime

[![npm version](https://badge.fury.io/js/%40ryantam626%2Fjupyterlab_sublime.svg)](https://badge.fury.io/js/%40ryantam626%2Fjupyterlab_sublime)
[![npm downloads](https://img.shields.io/npm/dw/%40ryantam626%2Fjupyterlab_sublime.svg)](https://badge.fury.io/js/%40ryantam626%2Fjupyterlab_sublime)

A slightly opinionated Sublime notebook cell binding for JupyterLab.

## Notes

Most of the keybindings implemented by CodeMirror just work out of the box after switching the key map, there were a little pesky keys that collide either with my system level shortcuts, broswer shortcuts or jupyterlab shortcuts.
A few keybindings which seem most useful are adapted.
Consult the [checklist](sublimeKeyChecklist.md) for more details.

## Why opinionated?

There are some keybindings which simply don't feel useful, so they are repurposed, again see the [checklist](https://github.com/mastersign/jupyterlab_sublime/blob/master/sublimeKeyChecklist.md).

## Prerequisites

* JupyterLab 1.0

## Installation

```bash
jupyter labextension install @ryantam626/jupyterlab_sublime
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
jupyter lab build
```
