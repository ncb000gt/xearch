/**
*    Creates a search tool that can be implemented anywhere from the Axiom CMS
*    Copyright (C) 2009  Nicholas Campbell
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Affero General Public License as
*    published by the Free Software Foundation, either version 3 of the
*    License, or (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Affero General Public License for more details.
*
*    You should have received a copy of the GNU Affero General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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