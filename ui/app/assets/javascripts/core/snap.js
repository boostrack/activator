// Sort of MVC (Module, Grid, Router)
define(['./plugin', './grid', './router', './pluginapi', './navigation', './tutorial/tutorial'], function(plugins, Grid, router, api, navigation, tutorial) {

	var ko = api.ko,
		key = api.key;

	// Model for the whole app view
	var model = {
		snap: {
			// TODO - This should be observable and we get notified of changes by sbt....
			appName: window.serverAppModel.name ? window.serverAppModel.name : window.serverAppModel.id,
			pageTitle: ko.observable(),
			activeWidget: api.activeWidget
		},
		plugins: plugins,
		router: router,
		grid: Grid,
		// This is the initialization of the application...
		init: function() {
			var self = this;
			self.widgets = [];
			// TODO - initialize plugins in a better way perhaps...
			$.each(self.plugins.list, function(idx,plugin) {
				self.router.registerRoutes(plugin.routes);
				$.each(plugin.widgets, function(idx, widget) {
					self.widgets.push(widget);
				});
			});
			self.router.init();
			ko.applyBindings(self, window.body);
			navigation.init();
			return self;
		},
		api: api,
		tutorial: tutorial
	};
	window.model = model.init();

	return model;
});