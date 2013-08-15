---
layout: index
---

The word *level* refers to level in the experimental tree, overriding the definition of level in [experimental design](http://en.wikipedia.org/wiki/Factorial_experiment).

1. **Experimental structure:** Load your experimental structure into a tree of `Tribulations.NodeModel` objects, optionally passing down a model on the `innerModel` property that will eventually be rendered in the view.

```javascript
```

2. **Views for each level of the experimental tree**: Create subclasses of `Backbone.View` or `Marionette.View` for each level of the experimental tree (i.e. `ConditionView` for displaying instructions at the beginning of a condition). (Recall that in Javascript MV\* frameworks, views are actually more like controllers in traditional MVC, and thus contain the logic for each level of your experiment).

```javascript

```

3. **Run the experiment**: Initialize a `Tribulations.ExperimentRunnerView` with your experimental structure. Once you show this view in Marionette, the experiment will begin.

```javascript
```

