
import {Linter, Rule, ParseState, RuleError} from 'template-lint';
import {TemplateRule} from './template';

describe("Template Rule", () => {

  var linter: Linter = new Linter([
    new TemplateRule()
  ]);
  
    it("will accept template root element", (done) => {
    linter.lint('<template></template>')
      .then((errors) => {                
        expect(errors.length).toBe(0);
        done();
      });
  });
  
  it("will reject non-template root element", (done) => {
    linter.lint('<temslat></temslat>')
      .then((errors) => {
        expect(errors[0].message).toBe('root element is not template');
        done();
      });
  });
  
  it("will ignore html non-template root element", (done) => {
    
    linter.lint('<!DOCTYPE html><html><body><temslat></temslat></body></html>')
      .then((errors) => {
        expect(errors.length).toBe(0);
        done();
      });      
  });

  it("will ignore nested template part replacement", (done) => {
    
    linter.lint('<template><template replace-part=""></template></template>')
      .then((errors) => {
        expect(errors.length).toBe(0);
        done();
      });      
  });
  
  it("will reject more than one template", (done) => {
    linter.lint('<template></template><template></template>')
      .then((errors) => {
        expect(errors[0].message).toBe("extraneous template found");
        done();
      });
  })
  
  it("will reject nested template", (done) => {
    linter.lint('<template><template></template></template>')
      .then((errors) => {
        expect(errors[0].message).toBe("nested template found");
        done();
      });
  });
  
  it("will pass template with valid contents", (done) => {
    linter.lint('<template><button></button><div></div></template>')
      .then((errors) => {
        expect(errors.length).toBe(0);
        done();
      });
  });
});