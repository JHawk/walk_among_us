describe("StubGet", function() {
  var stubGet;

  var testData = "test";

  beforeEach(function() {
    stubGet = new StubGet();

    $.get = function (_url, success) {
      success(testData);
    };
    spyOn($, 'get')
  });

  it("send test data through $.get stub", function() {
    stubGet.call();

    expect(stubGet.getData).toEqual(testData)
  });
});