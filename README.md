Tribulations: The Online Experiment Runner
============

Tribulations is a Javascript library for [Marionette](http://marionettejs.com/) the display logic of instructions and experimental tasks in remote experiments.

Demo and Documentation
-----------
See the [demo](TODO) and [documentation](TODO).

When should I use Tribulations?
------------
You should use Tribulations when your experimental structure can be expressed by a tree. More specifically, consider evaluating the performance of multiple clicking tools ( *conditions* ). In each condition, there are multiple *blocks*, and in each block, there are multiple *trials*.

![Example of a tree showing experimental structure](docs/experiment_structure.png)

Aside from the assumption that your experimental structure follows a tree with leaves at equal depth, **Tribulations makes no assumptions about the content of your experiment**. 

Prerequisites
-------------

Tribulations uses Marionette, a popular Javascript MV\* framework built on Backbone.js. 

* [Marionette.js](http://marionettejs.com)
  * [jQuery](http://jquery.com)
  * [Backbone.js](http://backbonejs.org/)
  * [Underscore.js](http://underscorejs.org/)


Contributing
-------------
Install [npm](https://npmjs.org/) and run `npm install`. 

To run the tests, install [PhantomJS](http://phantomjs.org/).

To compile and test, run `grunt`.

License
-------------
Copyright 2013 Louis Li

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
