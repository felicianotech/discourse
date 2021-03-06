import { acceptance } from "helpers/qunit-helpers";

acceptance("Accept Invite - User Fields", {
  site: {
    user_fields: [{"id":34,"name":"I've read the terms of service","field_type":"confirm","required":true},
                  {"id":35,"name":"What is your pet's name?","field_type":"text","required":true},
                  {"id":36,"name":"What's your dad like?","field_type":"text","required":false}]
  }
});

QUnit.test("accept invite with user fields", assert => {
  visit("/invites/myvalidinvitetoken");
  andThen(() => {
    assert.ok(exists(".invites-show"), "shows the accept invite page");
    assert.ok(exists('.user-field'), "it has at least one user field");
    assert.ok(exists('.invites-show .btn-primary:disabled'), 'submit is disabled');
  });

  fillIn("#new-account-name", 'John Doe');
  fillIn("#new-account-username", 'validname');
  fillIn("#new-account-password", 'secur3ty4Y0uAndMe');

  andThen(() => {
    assert.ok(exists(".username-input .good"), "username is valid");
    assert.ok(exists('.invites-show .btn-primary:disabled'), 'submit is still disabled due to lack of user fields');
  });

  fillIn(".user-field input[type=text]:first", "Barky");

  andThen(() => {
    assert.ok(exists('.invites-show .btn-primary:disabled'), 'submit is disabled because field is not checked');
  });

  click(".user-field input[type=checkbox]");
  andThen(() => {
    assert.not(exists('.invites-show .btn-primary:disabled'), 'submit is enabled because field is checked');
  });

  click(".user-field input[type=checkbox]");
  andThen(() => {
    assert.ok(exists('.invites-show .btn-primary:disabled'), 'unclicking the checkbox disables the submit');
  });

});
