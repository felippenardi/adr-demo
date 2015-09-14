(function() {

angular.module('notes.module')

.directive('adrNotesCategory', CategoryDirective)

/*
 * @class CategoryDirective
 * @classdesc Directive for categories of notes displayed within column blocks within the notes view
 * @ngInject
 */
function CategoryDirective(_) {

	// REFACTOR: scope isolation for category should be an @

	return {
		restrict: 'E',
		scope: {
			category: '=',
			data: '='
		},
		bindToController: true,
		controllerAs: 'category',
		controller: CategoryCtrl,
		templateUrl: 'app/notes/directives/category/category.directive.html'
	};

}

/*
 * @class CategoryCtrl
 * @classdesc Controller for the categoryDirective
 * @ngInject
 */
function CategoryCtrl() {

    var vm = this;
    vm.next_note = "";

    var categoryObj = _.first(_.where(vm.data.categories, { id: vm.category } ));

    vm.addNote = function() {

        var party = _.first(_.where(vm.data.parties, { selected: true }));


        var note = {
            id: getId(),
            created: Date.now(),
            category: vm.category,
            text: vm.next_note,
            party_id: party.id,
            priority: categoryObj.priority,
            selected: false,
            link_mode: false
        };

        vm.data.notes.push(note);
        vm.next_note = "";
    };

    // so that it effects all notes
    vm.selectParty = function(partyId) {
        vm.data.parties = _.map(vm.data.parties, function(party) {
            var p = {};
            p.id = party.id;
            p.short_name = party.short_name;
            if (party.id == partyId) {
                p.selected = true;
            } else {
                p.selected = false;
            }
            return p;
        });
    };

}

}())
