# tinywhich

[![npm](https://img.shields.io/npm/v/tinywhich)](https://www.npmjs.com/package/tinywhich)
![node >=16](https://img.shields.io/node/v/tinywhich)
[![install size](https://packagephobia.com/badge?p=tinywhich)](https://packagephobia.com/result?p=tinywhich)
[![bundle size](https://img.shields.io/bundlejs/size/tinywhich)](https://bundlejs.com/?q=tinywhich&treeshake=%5B%7B+which+%7D%5D)

A library for locating files in the directories specified by the `PATH` (or `Path`) environment variable.

Supports Windows' `PATHEXT` environment variable.

A smaller (50kb -> 5kb), faster (probably?) alternative to [which](https://github.com/npm/node-which).

## Installation

<details>
<summary>pnpm</summary>

```shell
pnpm add tinywhich
```

</details>

<details>
<summary>yarn</summary>

```shell
yarn add tinywhich
```

</details>

<details>
<summary>npm</summary>

```shell
npm install tinywhich
```

</details>

<details>
<summary>bun</summary>

```shell
bun add tinywhich
```

</details>

## Usage

```js
import { which } from "tinywhich"
// const { which } = require("tinywhich")

which("node") // "[absolute path]/node"
which("notfound") // null
```

## Comparison

_Benchmarks can be found in [./bench](./bench)_

_Windows benchmark was run on 9800X3D + NVMe SSD, Node v22, with 44 directories in `PATH`, and default `PATHEXT`_

| pkg       | PATHEXT | install size | bundle size | bench (linux) | bench (windows)     |
| --------- | ------- | ------------ | ----------- | ------------- | ------------------- |
| tinywhich | ✅      | 6kb          | 552b        |               | 216µs               |
| which     | ❌      | 50kb (x8)    | 3.88kb (x7) |               | 960µs (x4.5 (sync)) |
