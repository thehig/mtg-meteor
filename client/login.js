//Note - Because we are making a single page application, we do not want the default form submission
//          evt.preventDefault(); prevents the form from submitting and allows us to handle the event manually

Template.signup.events({
    'click button': function(evt, template){
        evt.preventDefault();

        //The Accounts plugin will automatically login a use who signs-up
        //  This will only work if the boxes are sufficiently filled
        Accounts.createUser({
            email: template.find('#su-email').value,
            username: template.find('#su-username').value,
            password: template.find('#su-password').value
        });
    }
});

Template.login.events({
    'click button': function(evt, template){
        evt.preventDefault();
        Meteor.loginWithPassword(
            template.find('#li-username').value,
            template.find('#li-password').value
        );
    }
});

Template.logout.events({
    'click button': function(evt, template){
        evt.preventDefault();
        Meteor.logout();
    }
});