function nerdList() {
    
    $.ajax({
        url         : '/nerd-list',            // this string is the flag for your db service in fileserver.js //
        contentType : 'text/json',
        dataType    : 'json',
        success     : function(nerds) {
            var NerdList = [];
            
            for (var i = 0; i < nerds.length; i++) { // style="left:-'+$(window).width()+'px;"
                  var nerd = nerds[i];
                  var nerdMeta = [];
                  
                  for (var attr in nerd) {
                      if (attr != '_id') {
                          if(attr == 'name') {
                            nerdMeta.push(new Todo('<a _id="'+nerd['_id']+'" _name="'+nerd[attr]+'" _meta="'+attr+'" class="icon '+attr+'"></a>'+nerd[attr]));  
                          }
                          else if(attr == 'google' || attr == 'facebook' || attr == 'linkedin' || attr == 'website') {
                            nerdMeta.push(new Todo('<a _meta="'+attr+'" class="icon '+attr+'" href="'+nerd[attr]+'"></a>Visit Profile'));
                          }
                          else if(nerd[attr] != '' && attr != 'image') {
                            nerdMeta.push(new Todo('<a class="icon '+attr+'"></a>'+nerd[attr]));
                          }
                      }
                  }
                  
                  NerdList.push(
                     new List(nerd.name, nerdMeta)   
                  );
            }
            
            var app = new Home(NerdList);
            app.render().appendTo('#wrapper');
        }
    }); 
    
}