---
layout: index
---

Don't worry about the display logic for writing highly structured experiments -- just provide the data and templates.

```javascript
// Configure our experiment with our experimental structure and DOM templates
var experimentRunnerView = new Tribulations.ExperimentRunnerView({
  experimentStructure: myExperimentalStructure
  subviewClasses: [ConditionSectionView, BlockSectionView, TrialSectionView]
  regionElement: "#experiment-region"
  template: "#runner-template"
});

// Begin the experiment!
App.mainRegion.show(experimentRunnerView);
```

# Usage
Tribulations only exports two classes: `Tribulations.ExperimentRunnerView` (a subclass of [`Marionette.Layout`](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.layout.md) and `Tribulations.Node`.

**NOTE**: This documentation assumes some knowledge of [Marionette](http://marionettejs.com/). 

## Tutorial
1. **Create view classes for each level of the tree.** These classes should be subclasses of [`Marionette.View`](https://github.com/marionettejs/backbone.marionette/tree/master/docs) for each level of the experimental tree (i.e. `ConditionView` for instructions at beginning of a condition, `TrialView` for trial activities). Recall that in Javascript MV\* frameworks, views are actually more akin to the controllers of traditional MVC, containing more application logic).
```javascript
foo
```


2. **Convert the experimental structure into a tree.** T `Tribulations.NodeModel` objects, optionally passing down a model on the `innerModel` property that will eventually be rendered in the view.
```javascript

```

3. **Create a DOM element for the experiment**. The name of the template and the region can be anything -- they will be passed into a view later.
```html
<script id="runner-template" type="text/html">
  <div id="#experiment-region">
  </div>
</script>
``` 
4. **Run the experiment**: Initialize a `Tribulations.ExperimentRunnerView` with your experimental structure. Once you show this view in Marionette, the experiment will begin.
```javascript
var experimentRunnerView = new Tribulations.ExperimentRunnerView({
  experimentStructure: experimentStructure
  subviewClasses: [ConditionSectionView, BlockSectionView, TrialSectionView]
  regionElement: "#experiment-region"
  template: "#runner-template"
});

// Starts the experiment on the first condition
App.mainRegion.show(experimentRunnerView);
```

## Attributes


