var GraphLibrary = (function() {

    var getOutNodes = function(node, nodes, edges) {

        var list = [];

        edges.forEach(function(edge) {

            if (edge.from === node.id) {
                list.push(nodes.find(function(item) {
                    return item.id === edge.to;
                }));
            }

        });

        return list;
    };

    var clone = function(input) {
        return JSON.parse(JSON.stringify(input));
    };

    var removeDuplicates = function(input) {
        return input.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
    };

    var cycleRecursive = function(current, nodes, edges, path, result) {

        if (path.length > 0) {

            // we found a current, self-returning circle
            if (path[0] === current.id) {
                path.push(current.id);
                result.push(path);
                return;
            }

            // we already found a path and a circle, this is not what we want
            if (path.find(function(f) { return f === current.id; })) {
                return;
            }
        }

        var outNodes = getOutNodes(current, nodes, edges);

        outNodes.forEach(function(node) {
            var clonedArray = clone(path);
            clonedArray.push(current.id);
            cycleRecursive(node, nodes, edges, clonedArray, result);
        }.bind(this));

    };

    var arrayEquals = function(a, b) {

        if (a.length === b.length) {

            var sortedA = removeDuplicates(clone(a)).sort();
            var sortedB = removeDuplicates(clone(b)).sort();

            for (var i = 0; i < sortedA.length; i++) {
                if (sortedA[i] !== sortedB[i]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    };

    var unique = function(list) {

        var result = [];

        list.forEach(function(item) {

            var found = false;

            result.forEach(function(r) {

                if (arrayEquals(r, item)) {
                    found = true;
                }

            });

            if (!found) {
                result.push(item);
            }

        });

        return result;
    };

    return {
        cycles: function(nodes, edges) {

            var result = [];

            nodes.forEach(function(node) {
                cycleRecursive(node, nodes, edges, [], result);
            });

            return unique(result);
        },
    };

}());

var nodes = [];

nodes.push({ id: 1, name: "1" });
nodes.push({ id: 2, name: "2" });
nodes.push({ id: 3, name: "3" });
nodes.push({ id: 4, name: "4" });
nodes.push({ id: 5, name: "5" });
nodes.push({ id: 6, name: "6" });
nodes.push({ id: 7, name: "7" });

var edges = [];

edges.push({ from: 1, to: 2 });
edges.push({ from: 2, to: 3 });
edges.push({ from: 2, to: 5 });
edges.push({ from: 3, to: 1 });
edges.push({ from: 5, to: 6 });
edges.push({ from: 5, to: 7 });
edges.push({ from: 6, to: 3 });

var result = GraphLibrary.cycles(nodes, edges);

console.log(result);