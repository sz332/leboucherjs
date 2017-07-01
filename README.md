# Introduction

This project is about displaying the la canne - stick fencing - sequences of an old manual for
study purposes. 


# Installation

The following chapter describes the installation process of NPM and bower. This steps 
needs to be done only once.

## 1. Install node js for NPM package manager 

Download and install nodejs from [nodejs.org](https://nodejs.org)

## 2. Install bower and polymer-cli

```cmd
    npm install -g bower
    npm install -g polymer-cli
```

## 3. Download dependencies

```cmd
cd leboucherjs
bower install
```

This command will create a bower_components folder with necessary dependencies.

## 2. Start web server

```cmd
cd leboucherjs
polymer serve
```

The result output will be something like:

```
λ polymer serve
info: Files in this directory are available under the following URLs
      applications: http://127.0.0.1:8081
      reusable components: http://127.0.0.1:8081/components/my-polymer-tutorial/
```

## 3. Open the url provided by polymer serve in a browser

```cmd
chrome http://127.0.0.1:8081
```
