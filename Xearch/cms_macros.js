function getPrototypeList() {
    var proto_list = cmsGlobals.props..prototype.(@addable != 'false');
    var elements = [];
    var results = [];
    for each(var proto in proto_list){
	if(typeof this.cmsAddableAdvice == 'function'){
	    if(this.cmsAddableAdvice(proto.@name.toString()))
		elements.push(proto);
	} else {
	    elements.push(proto);
	}
    }
    elements.sort(function(a,b){ return new java.lang.String(a.@displayname.toString()).compareTo(b.@displayname.toString()); });
    for each(var proto in elements){
	results.push([proto.@name.toString(), (proto.@displayname || proto.@name).toString()]);
    }

    return results;
}

function getSearchProfileList() {
    var profiles = app.__app__.getSearchProperties().keys();
    var results = [];
    while(profiles.hasMoreElements()) {
	var profile = profiles.nextElement();
	if (profile.match(/(fields|analyzer|filter)/)) {
	    continue;
	}
	results.push([profile, profile]);
    }

    return results;
}