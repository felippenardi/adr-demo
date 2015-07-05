<!-- adr.notes.js -->
angular.module('adr.notes')
.controller('NotesController')
.directive('categories')
.directive('note')

<!-- example template -->
<div class="note-categories-container">

	<categories ng-repeat="category in categories|arrange">
		<note ng-repeat="note in category"></note>
	</category>

</div>
