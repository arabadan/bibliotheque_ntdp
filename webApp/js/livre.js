var Book = function(livre) {
	this.id = ko.observable(livre.id);  
	this.nom = ko.observable(livre.nom);  
	this.description = ko.observable(livre.description);  
};
  
var ViewModel = function(livres) {  
	var self = this;  

	self.livres = ko.observableArray(ko.utils.arrayMap(livres, function(livre) { 
		return new Book(livre);
	}));
	
	self.query = ko.observable("");
	self.filteredLivres = ko.computed(function() {
        var filter = self.query().toLowerCase();

        if (!filter) {
            return self.livres();
        } else {
            return ko.utils.arrayFilter(self.livres(), function(livre) {
                if(livre.nom().toLowerCase().indexOf(filter) !== -1 || livre.description().toLowerCase().indexOf(filter) !== -1) {
					return livre;
				}
            });
        }
    });
	
	self.addNewBook = function() {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/count",  
			type: "GET",
			headers: {  
				Accept : "text/plain"  
			}  
		}).success(function(data, status, jq) {
			var c = new Book({id: parseInt(data)+1, nom: '', description: ''});
			self.livres.push(c);
			self.add(c);
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});
    };
	
	self.add = function(livre) {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre",  
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(ko.toJS(livre)),
			headers: {  
				Accept : "application/json"  
			}  
		}).success(function(data, status, jq) {  
			ko.applyBindings(new ViewModel(data));   
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});  
	};
	
	self.remove = function(livre) {
	   self.livres.remove(livre);
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/"+livre.id(),  
			type: "DELETE",  
			contentType: "application/json",  
			headers: {  
			Accept : "application/json"  
		}  
		}).success(function(data, status, jq) {  
			self.livres.remove(livre);  
		}).error(function(jq, status, error) {  
			$(".error").text(JSON.stringify(status + " " + error));  
		});  
	};  

	self.update = function(livre) {
		$.ajax({  
			url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/"+livre.id(),  
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
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre",  
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