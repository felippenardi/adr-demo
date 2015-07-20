describe ('NoteDirective', function() {
	beforeEach(module('adr.notes'));

	/* 
	 * loading this module enables Angular to load templates from a url
	 * inside of the specs.
	 *
	 * see https://github.com/karma-runner/karma-ng-html2js-preprocessor
	 *
	 */
	beforeEach(module('html2js-preprocessed-templates'));
	var 	$compile,
		$rootScope;
	
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('should display the note text', function() {
		/*
		var scope = $rootScope.$new();
		scope.note = {text: "test note text"};
	       */
		$rootScope.note = {text: "test note text"};
		//var element = $compile("<note note=note></note>")(scope);
		var element = $compile("<note note=note></note>")($rootScope);
		//scope.$digest();
		$rootScope.$digest();
		expect(element.html()).toContain("test note text");
	});

});
