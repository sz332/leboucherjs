var testData = function() {

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

    return {
        nodes: nodes,
        edges: edges
    }
}

QUnit.test("Test single edge unordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });

    var edges = [];

    edges.push({ from: 1, to: 2 });

    var result = GraphLibrary.cycles(nodes, edges);

    assert.equal(result.length, 0);

}.bind(this));

QUnit.test("Test single edge ordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });

    var edges = [];

    edges.push({ from: 1, to: 2 });

    var result = GraphLibrary.orderedCycles(nodes, edges);

    assert.equal(result.length, 0);

}.bind(this));

QUnit.test("Test cycle unordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });

    var edges = [];

    edges.push({ from: 1, to: 2 });
    edges.push({ from: 2, to: 1 });

    var result = GraphLibrary.cycles(nodes, edges);

    assert.equal(result.length, 1);

}.bind(this));

QUnit.test("Test cycle ordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });

    var edges = [];

    edges.push({ from: 1, to: 2 });
    edges.push({ from: 2, to: 1 });

    var result = GraphLibrary.orderedCycles(nodes, edges);

    assert.equal(result.length, 1);

}.bind(this));

QUnit.test("Test multipoint cycle unordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });
    nodes.push({ id: 3, name: "3" });

    var edges = [];

    edges.push({ from: 1, to: 2 });
    edges.push({ from: 2, to: 3 });
    edges.push({ from: 3, to: 1 });

    var result = GraphLibrary.cycles(nodes, edges);

    assert.equal(result.length, 1);

    assert.equal(result[0].indexOf(1) !== -1, true, "1 found in path");
    assert.equal(result[0].indexOf(2) !== -1, true, "2 found in path");
    assert.equal(result[0].indexOf(3) !== -1, true, "3 found in path");

}.bind(this));

QUnit.test("Test multipoint cycle ordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });
    nodes.push({ id: 3, name: "3" });

    var edges = [];

    edges.push({ from: 1, to: 2 });
    edges.push({ from: 2, to: 3 });
    edges.push({ from: 3, to: 1 });

    var result = GraphLibrary.orderedCycles(nodes, edges);

    assert.equal(result.length, 1);

    assert.equal(result[0].length, 3, "Path contains 3 nodes");
    assert.equal(result[0].data[0].indexOf(1) !== -1, true, "1 found in path");
    assert.equal(result[0].data[0].indexOf(2) !== -1, true, "2 found in path");
    assert.equal(result[0].data[0].indexOf(3) !== -1, true, "3 found in path");

}.bind(this));

QUnit.test("Test multipoint cycle ordered", function(assert) {

    var nodes = [];

    nodes.push({ id: 1, name: "1" });
    nodes.push({ id: 2, name: "2" });
    nodes.push({ id: 3, name: "3" });
    nodes.push({ id: 4, name: "4" });

    var edges = [];

    edges.push({ from: 1, to: 2 });
    edges.push({ from: 2, to: 3 });
    edges.push({ from: 2, to: 4 });
    edges.push({ from: 3, to: 1 });
    edges.push({ from: 4, to: 1 });

    var result = GraphLibrary.orderedCycles(nodes, edges);

    assert.equal(result[0].length, 3, "Path contains 3 nodes");

    assert.equal(result[0].data[0].indexOf(1) !== -1, true, "1 found in path");
    assert.equal(result[0].data[0].indexOf(2) !== -1, true, "2 found in path");
    assert.equal(result[0].data[0].indexOf(3) !== -1, true, "3 found in path");

    assert.equal(result[0].data[1].indexOf(1) !== -1, true, "1 found in path");
    assert.equal(result[0].data[1].indexOf(2) !== -1, true, "2 found in path");
    assert.equal(result[0].data[1].indexOf(4) !== -1, true, "3 found in path");

}.bind(this));

