describe("script loading", function() {
  it("app namespace should be present", function() {
    expect({%=js_safe_name%}).toBeDefined();
  })
});
