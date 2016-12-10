var Category = function(categorie) {
	this.id = ko.observable(categorie.id);  
	this.nom = ko.observable(categorie.nom);  
	this.description = ko.observable(categorie.description);  
};
  
var ViewModel = function(categories) {  
	var self = this;  

	self.categories = ko.observableArray(ko.utils.arrayMap(categories, function(categorie) { 
		return new Category(categorie);
	}));
	
	self.query = ko.observable("");
	self.filteredCategories = ko.computed(function() {
        var filter = self.query().toLowerCase();

        if (!filter) {
            return self.categories();
        } else {
            return ko.utils.arrayFilter(self.categories(), function(categorie) {
                if(categorie.nom().toLowerCase().indexOf(filter) !== -1 || categorie.description().toLowerCase().indexOf(filter) !== -1) {
					return categorie;
				}
            });
        }
    });
	
	self.addNewCategory = function() {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie/count",  
			type: "GET",
			headers: {  
				Accept : "text/plain"  
			}  
		}).success(function(data, status, jq) {
			var c = new Category({id: parseInt(data)+1, nom: '', description: ''});
			self.categories.push(c);
			self.add(c);
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});
    };
	
	self.add = function(categorie) {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie",  
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(ko.toJS(categorie)),
			headers: {  
				Accept : "application/json"  
			}  
		}).success(function(data, status, jq) {  
			ko.applyBindings(new ViewModel(data));   
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});  
	};
	
	self.remove = function(categorie) {
	   self.categories.remove(categorie);
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie/"+categorie.id(),  
			type: "DELETE",  
			contentType: "application/json",  
			headers: {  
			Accept : "application/json"  
		}  
		}).success(function(data, status, jq) {  
			self.categories.remove(categorie);  
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});  
	};  

	self.update = function(categorie) {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie/"+categorie.id(),  
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(ko.toJS(this)),
			headers: {  
				Accept : "application/json"  
			}  
		}).success(function(data, status, jq) {  
			ko.applyBindings(new ViewModel(data));   
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});
	};
};


var getData = function() {  
    $.ajax({  
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie",  
			type: "GET",  
        headers: {  
            Accept: "application/json"  
        }  
    }).success(function(data, status, jq) {
        ko.applyBindings(new ViewModel(data));  
    }).error(function(jq, status, error) {
        $(".error").text(JSON.stringify(status + " " + error));
    });
};