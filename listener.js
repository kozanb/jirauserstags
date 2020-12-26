document.addEventListener('DOMContentLoaded', function () {
    var dataScript = document.createElement('script');
    dataScript.id = 'customuserscript';

    dataScript.innerHTML = `(window.loadData = function(bool) {
        if (document.querySelectorAll('#user_modal_id').length !== 0 && document.querySelectorAll('.custommodal').length !== 0) {
            document.querySelectorAll('#user_modal_id')[0].remove();
            document.querySelectorAll('.custommodal')[0].remove();
        }
    
        var self = document;
    
        var getUserData = new Promise(function (resolve, reject) {
            var userList = {};
    
            self.querySelectorAll('.user-hover[data-user], a.user-hover:not([id]), .user-hover.user-avatar').forEach(function (test) {
                var accountId = '';
                var displayName = '';
    console.log(test);
                if (test.getAttribute('data-user') || false) {
                    var userObj = JSON.parse(test.getAttribute('data-user') || '{}') || {};
    
                    accountId = userObj.accountId || '';
                    displayName = userObj.displayName || '';
                } else if (test.getAttribute('data-account-id') || false) {
                    accountId = test.getAttribute('data-account-id') || '';
                    displayName = test.innerText || '';
                } else {
                    accountId = (test.getAttribute('href') || '').split('accountId=')[1] || '';
                    displayName = (test.innerText || '').trim();
                }
    
    
                if (displayName !== '' && accountId !== '') {
                    userList[displayName] = {
                        accountId: accountId,
                        displayName: displayName,
                        userTag: '[' + displayName + '|~accountid:' + accountId + ']'
                    }
                }
            });
    
            console.log(userList);
            resolve(userList);
        });
    
        getUserData.then(function (data) {
            var modalStyle = document.createElement('style');
            modalStyle.id = 'user_modal_id';
    
            modalStyle.innerHTML = '.custommodal {display: none;position: fixed;z-index: 1;padding-top: 200px;top: 0;width:50rem;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0);}.custommodal-content {background-color: #fefefe;margin: auto;padding: 20px; border: 1px solid #888;width: 80%;}';
    
            document.getElementsByTagName('head')[0].appendChild(modalStyle)
    
            var userListHTML = document.createElement('ul');
    
            (Object.values(data) || []).map(function (userData) {
                if ((userData.displayName || '').indexOf('Automation') === -1 && (userData.displayName || '').indexOf('Outsource') === -1) {
                    var liElement = document.createElement('li');
                    var brElement = document.createElement('br');
    
                    liElement.innerText = userData.displayName + ' \\n ' + userData.userTag;
    
                    userListHTML.appendChild(liElement);
                    userListHTML.appendChild(brElement);
                }
            });
    
            var modalContainer = document.createElement('div');
            modalContainer.className = 'custommodal';
    
            var modalContent = document.createElement('div');
            modalContent.className = 'custommodal-content'
    
            modalContainer.appendChild(modalContent);
            modalContent.appendChild(userListHTML);
    
            setTimeout(function () {
                var siteContent = document.getElementById('content');
                siteContent.appendChild(modalContainer);
                if(bool){
                    modalContainer.style.display = 'block';
                }
            }, 1000);
        });
    })(false);`;

    if (window.location.href.includes('SRTR')) {
        document.getElementsByTagName('body')[0].appendChild(dataScript);
    }
});