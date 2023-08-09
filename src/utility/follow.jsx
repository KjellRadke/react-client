import {getRequest} from "../api/api-service";

export function follow(rootPath, relArray) {

    const root = getRequest(rootPath);
    function traverseNext(root, rel, arrayItem) {

        return root.then(function (response) {

                if (hasEmbeddedRel(response, rel)) {
                    return response._embedded[rel];
                }
                if (!response._links) {
                    return [];
                }
                if (typeof arrayItem === 'string') {
                    return getRequest(response._links[rel].href)
                } else {
                    return getRequest(response._links[rel].href,arrayItem.params)
                }
            }
        )
    }
    function hasEmbeddedRel(entity, rel) {
        return entity?._embedded && entity?._embedded.hasOwnProperty(rel);
    }

    return relArray.reduce(function (root, arrayItem) {
        const rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
        return traverseNext(root, rel, arrayItem);
    }, root);


}
