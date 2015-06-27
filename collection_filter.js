var collectionFilter = function(brandList, tagList, typeList) {
 
  var data = {
    brandList : {},
    tagList : {},
    typeList : {},
    selectedBrandList : [],
    selectedTagList : [],
    typingTimer : null,
    selectedTypeList : [],
    searchInterval : 0
  };
  var messageOnNoSearchResult = "<p align='center'>No Search Result Found</p>"
    
  data.brandList = brandList;
  data.tagList = tagList;
  data.typeList = typeList;
  
  function doneSearchBoxTypingBrand() {
    	var name = "brand";
        var enteredText = refs.searchBrands.val().trim().toLowerCase();
        if(enteredText) {
            var result = '';
            for(var key in data.brandList) {
              var label = "&nbsp;&nbsp;" + key;
              var keyToLower = key.toLowerCase();
              if(keyToLower.indexOf(enteredText) >=0 ) {
                if(data.selectedBrandList.indexOf(keyToLower) >=0 ) 
                  result += getRadioBox(key, name, "checked", key, label);
                else
                  result += getRadioBox(key, name, "", key, label);
              }
            };
            if(result) 
              refs.brandList.html(result);
            else
              refs.brandList.html(messageOnNoSearchResult);
        } else {
          var result = '';
            for(var key in data.brandList) {
                var label = "&nbsp;&nbsp;" + key;
                var keyToLower = key.toLowerCase();
                if(data.selectedBrandList.indexOf(keyToLower) >=0 ) 
                  result += getRadioBox(key, name, "checked", key, label);
                else
                  result += getRadioBox(key, name, "", key, label);
            };
             refs.brandList.html(result);
        }
		return true
	};
  
  function doneSearchBoxTypingTag() {

        var enteredText = refs.searchTags.val().trim().toLowerCase();
        var tagList = data.tagList;
        if(enteredText) {
            var result = '';
            for(var key in tagList) {
              var label =  tagList[key];
              var labelToLower = label.toLowerCase();
              var keyToLower = key.toLowerCase();
              if(labelToLower.indexOf(enteredText) >=0 ) {
                if(data.selectedTagList.indexOf(keyToLower) >=0 ) 
                  result += getCheckBox(key, label, "checked", key);
                else
                  result += getCheckBox(key, label, "", key);
              }
            };
            if(result) 
              refs.tagList.html(result);
          else
              refs.tagList.html(messageOnNoSearchResult);
        } else {
          var result = '';
            for(var key in tagList) {
                var label = tagList[key];
                var keyToLower = key.toLowerCase();
                if(data.selectedTagList.indexOf(keyToLower) >=0 ) 
                  result += getCheckBox(key, label, "checked", key);
                else
                  result += getCheckBox(key, label, "", key);
            };
             refs.tagList.html(result);
        }
		return true
	};
  
     function doneSearchBoxTypingType() {
    	var name = "type";
        var enteredText = refs.searchTypes.val().trim().toLowerCase();
        if(enteredText) {
            var result = '';
          	var typeList = data.typeList;
            for(var key in typeList) {
              var label = "&nbsp;&nbsp;" + typeList[key];
              var labelToLower = label.toLowerCase(); 
              var keyToLower = key.toLowerCase();
              if(labelToLower.indexOf(enteredText) >=0 ) {
                if(data.selectedTypeList.indexOf(keyToLower) >=0 ) 
                  result += getRadioBox(key, name, "checked", key, label);
                else
                  result += getRadioBox(key, name, "", key, label);
              }
            };
            if(result) 
              refs.typeList.html(result);
            else
              refs.typeList.html(messageOnNoSearchResult);
        } else {
          var result = '';
          var typeList = data.typeList;
            for(var key in typeList) {
                var label = "&nbsp;&nbsp;" + typeList[key];
                var keyToLower = key.toLowerCase();
                if(data.selectedTypeList.indexOf(keyToLower) >=0 ) 
                  result += getRadioBox(key, name, "checked", key, label);
                else
                  result += getRadioBox(key, name, "", key, label);
            };
             refs.typeList.html(result);
        }
		return true
	};
  
  
  var getUrlVars = (function() {
			var urlVars = {};
			window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(c,
					variable, value) {
				urlVars[variable] = value
			});
			return urlVars
  })();
  
  var jqueryFunc = {
			makeAjaxCall : function(url, data, type, callback) {
				$.ajax({
					url : url,
					data : data,
					traditional : true,
					success : function(data) {
						callback(data)
					},
					error : function(e, f, d) {
						alert(nrollinGlobals.errorMsg)
					}
				})
			},
			addEvent : function(reference, event, callback) {
				$(reference)[event](callback)
			},
			loopOverElement : function(reference, callback) {
				$(reference).each(callback)
			}
  };
 
  var refs = {
    clearSelectedTags : $('#clearSelectedTags'),
    clearSelectedTypes : $('#clearSelectedTypes'),
    clearSelectedBrands : $('#clearSelectedBrands'),
    typeListFilter : $('#typeListFilter'),
    searchBrands : $('#searchBrands'),
    brandListFilter : $('#brandListFilter'),
    searchTags : $('#searchTags'),
    tagListFilter : $('#tagListFilter'),
    applyFilter : $('#applyFilter'),
    typeListExpander : $('#typeListExpander'),
    tagListExpander : $('#tagListExpander'),
    brandListExpander : $('#brandListExpander'),    
    brandList : $('#brandList'),
    tagList : $('#tagList'),
    searchTypes : $('#searchTypes'),
    typeList : $('#typeList')
  };
  
  
  function getSelectedboxes(reference) {
    var valueList = [];
    jqueryFunc.loopOverElement(
            reference + ' :checked', function() {
                var that = $(this);
                valueList.push(that.val())
            });
    return valueList;
  };
  
  function markBoxesAsPerUrlParameters() {
    
    var q = getUrlVars['q'];
    var constraint = getUrlVars['constraint'];
    var startMarking = function(reference, values, list) {
      jqueryFunc.loopOverElement(
            reference + ' input', function() {
                var that = $(this);
                var value = that.attr('value').toLowerCase();;
                if(values.indexOf(value)>=0) {
                  list.push(value);
                  that.prop('checked', true);
                }
            });
    };
    if(!q) {
      var url = window.location.pathname;
      var len = url.length;
      var str = '/collections/';
      var position = url.indexOf(str) + str.length;
      var tags = url.substring(position, len).toLowerCase();
      tags = tags.split('/');
      if(tags.length > 1) {
      	var values = tags[1].split('+');
      	startMarking('#tagList', values, data.selectedTagList);
      } 
      if(tags[0] !== 'all') 
        startMarking('#typeList', [tags[0]], data.selectedTypeList);
    } else {
      refs.brandList.find('input').prop('checked', true);
      data.selectedBrandList.push(refs.brandList.find('input').attr('value').toLowerCase());
      if(constraint) {
        var tags = constraint.toLowerCase();
        var values = tags.split('+');
        startMarking('#tagList', values, data.selectedTagList);
      }  
    }
  };
  
  
  function getCheckBox(value, name, checked, id) {
    return '<div class="checkbox"><input type="checkbox" value="'
    + value + '" id="' + id + '" ' + checked + '><label for="'
    + id + '" class="content">' + name + "</label></div>";
  };
  
  function getRadioBox(value, name, checked, id, label) {
    return  '<div class="radio"><label class="content" style="margin-left:1px;">' +
     '<input type="radio" name="' + name + '" id="' + id + '" value="' + value + '"' +
     checked + '>' + label  +  '</label></div>';
  };

  
    function applyFilter() {
        var clearSelectedTypes = refs.clearSelectedTypes.is(":checked");
        var clearSelectedTags = refs.clearSelectedTags.is(":checked");
        var clearSelectedBrands = refs.clearSelectedBrands.is(":checked");
      	
      	var selectedBrandList = getSelectedboxes('#brandList');
        var selectedTagList = getSelectedboxes('#tagList');
        var selectedTypeList = getSelectedboxes('#typeList');
        
      	var view = getUrlVars['view'];
        var sort_by = getUrlVars['sort_by'];
      
        var urlPara = '';
        var selectedBrandListLength = selectedBrandList.length;
        var selectedTagListLength = selectedTagList.length;
        var selectedTypeListLength = selectedTypeList.length;
      
        if(selectedBrandListLength && !clearSelectedBrands) {
          var href = data.brandList[selectedBrandList[0]];
          urlPara += href;
          if(selectedTagListLength && !clearSelectedTags) {
           urlPara += '&constraint=';
          }
        } else if(selectedTypeListLength && !clearSelectedTypes) {
          urlPara += '/collections/' + selectedTypeList[0] + '/';
        } else {
          urlPara += '/collections/all/';
        }
        
		
	    if(selectedTagListLength && !clearSelectedTags) {
          for(var i=0;i<selectedTagListLength; i++) {
			urlPara += selectedTagList[i] + '+';
          }
          urlPara =  urlPara.substring(0, urlPara.length - 1);
        } 
        
      	var checkForToolDropDown = function(para, value) {
          if(urlPara.indexOf('?') > 0) urlPara += '&' + para + '=' + value;
          else urlPara += '?' + para + '=' + value;
      	}
      
      	if(view) {
          checkForToolDropDown('view', view);
      	}
      
      	if(sort_by) {
          checkForToolDropDown('sort_by', sort_by);
      	}
      
        window.location.href = urlPara;
    };
  
  function checkFilterVisibility(id1, id2) {
    if (id1.css('display') === 'none')
        id2.text('+');
    else
        id2.text('-');
  };
  
  function checkFilterVisibilityCases() {
    checkFilterVisibility(refs.typeListFilter, refs.typeListExpander);
    checkFilterVisibility(refs.tagListFilter, refs.tagListExpander);
    checkFilterVisibility(refs.brandListFilter, refs.brandListExpander);
  };
  
  function eventForExpansion() {
    function checkForSign(that) {
      if(that.text() == "+") that.text("-")
      else that.text("+")
    }
    refs.typeListExpander.click(function(){
      refs.typeListFilter.toggle();
      checkForSign($(this));
    });
    refs.tagListExpander.click(function(){
      refs.tagListFilter.toggle();
      checkForSign($(this));
    });
    refs.brandListExpander.click(function(){
      refs.brandListFilter.toggle();
      checkForSign($(this));
    });
    
    $(window)
			.on('resize',
					function() {
						checkFilterVisibilityCases();
					});
  };
  
  function addEvents() {
    jqueryFunc.addEvent(
				"#applyFilter", 'click', function(e) {
					applyFilter();
				});
    eventForExpansion();
    
    refs.searchBrands.on('keyup', function() {
				clearTimeout(data.typingTimer);
				data.typingTimer = setTimeout(doneSearchBoxTypingBrand(),
						data.searchInterval)
			});

    refs.searchTags.on('keyup', function() {
				clearTimeout(data.typingTimer);
				data.typingTimer = setTimeout(doneSearchBoxTypingTag(),
						data.searchInterval)
			});
        refs.searchTypes.on('keyup', function() {
				clearTimeout(data.typingTimer);
				data.typingTimer = setTimeout(doneSearchBoxTypingType(),
						data.searchInterval)
			});
	$("#searchBrands, #searchTags, #searchTypes").keydown(function() {
		clearTimeout(data.typingTimer)
	});
  }
  
  function init() {
    markBoxesAsPerUrlParameters();
    addEvents()
    return data;
  };
  init();
}