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

function getResultHits(query) {
    query = this.getVerifiedQuery(query);

    var filters = [];
    var exact_regex = /\"([^\"]+)\"/g;
    var matches = query.match(exact_regex);
    for each(var match in matches)
	filters.push(match);
    query = query.replace(exact_regex, '');

    var stem_terms = query.split(/\s+/);
    for each(var stem_term in stem_terms){
	stem_term = stem_term.replace(/^\*|\*$/, '');
	if(stem_term != ''){
	    filters.push(stem_term+'*');
	}
    }

    for(filter in filters) {
	filters[filter] = filters[filter].replace(/([+\-&!(){}\[\]\'|^~\?])/g, "\\$1").replace('""', '');
    }

    var args = {};
    if (this.search_from_parent) {
	args.path = this._parent.getPath();
    }

    var hits = app.getHits(this.ptypes.split(','), new SearchFilter(filters.join(" "), this.search_profile), args);
    return hits;
}

function getVerifiedQuery(query) {
    if (!query || query == "" || query == "Search") {
	return "";
    }

    return query;
}

function getSearchResults() {
    var query = this.getVerifiedQuery(req.get('q') || '');
    var page = (req.get('p') || 0);
    var size = (req.get('s') || this.results_per_page || 10);

    var results = this.getResultHits(query);
    return this.search_results(
	{
	    results: results.objects((page || 0) * size, size),
	    query: query,
	    pages: Math.ceil(results.length/size),
	    count: results.length
	}
    );
}