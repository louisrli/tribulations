Tribulations: The Online Experiment Runner
============

Tribulations is a Javascript library for [Marionette.js](http://marionettejs.com/) that simplifies the flow of displaying instructions and experimental tasks in remote experiments (an increasingly common practice in human-computer interaction research).

When should I use Tribulations?
------------
You should use Tribulations when your experimental structure can be expressed by a tree. More specifically, consider evaluating the performance of multiple clicking tools (*conditions*). In each condition, there are multiple *blocks*, and in each block, there are multiple *trials*.

![Example of a tree showing experimental structure](docs/experiment_structure.png)

Aside from the assumption that your experimental structure follows a tree with all of it leaves at equal depth, **Tribulations makes no assumptions about the content of your experiment**. Most of the logic specific to your experiment will still be implemented by you.

Prerequisites
-------------

Tribulations uses Marionette, a popular Javascript MV\* framework built on Backbone.js. 

* [Marionette.js](http://marionettejs.com)
  * [jQuery](http://jquery.com)
  * [Backbone.js](http://backbonejs.org/)
  * [Underscore.js](http://underscorejs.org/)

Usage
------

Using Tribulations requires three steps. A more detailed tutorial follows. In the description below, the word *level* refers to level in the experimental tree, overriding the definition of level in [experimental design](http://en.wikipedia.org/wiki/Factorial_experiment).

1. **Experimental structure:** Load your experimental structure into a tree of `Tribulations.NodeModel` objects, optionally passing down a model on the `innerModel` property that will eventually be rendered in the view.
2. **Views for each level of the experimental tree**: Create subclasses of `Backbone.View` or `Marionette.View` for each level of the experimental tree (i.e. `ConditionView` for displaying instructions at the beginning of a condition). (Recall that in Javascript MV\* frameworks, views are actually more like controllers in traditional MVC, and thus contain the logic for each level of your experiment).
3. **Run the experiment**: Initialize a `Tribulations.ExperimentRunnerView` with your experimental structure. Once you show this view in Marionette, the experiment will begin.

TODO -- a tutorial

Contributing
-------------

TODO
phantomjs grunt coffeescript

