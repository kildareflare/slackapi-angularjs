'use strict';
(function (angular) {

    angular.module("Deg.SlackApi").service('slackSvc', ['$http', '$window', '$log', 'slackConfig', function ($http, $window, $log, slackConfig) {

        return {
            //auth
            authorize: authorizeApp,
            auth: {
                test: authTest
            },
            oauth: {
                access: getAccessToken
            },

            //channels
            channels: {
                archive: archiveChannel,
                create: createChannel,
                history: channelHistory,
                info: getChannel,
                invite: channelInvite,
                join: channelJoin,
                kick: channelKick,
                leave: channelleave,
                list: getChannelList,
                mark: channelMark,
                rename: channelRename,
                setPurpose: channelSetPurpose,
                setTopic: channelSetTopic,
                unarchive: channelUnarchive
            },

            //chat
            chat: {
                delete: deleteMessage,
                postMessage: postMessage,
                update: updateMessage
            },

            //files
            files: {
                delete: deleteFile,
                info: getFileInfo,
                list: listfiles,
                upload: uploadFile
            },
            
            //rtm
            rtm: {
                start: startRtm
            },

            //search
            search: {
                all: searchAll,
                files: searchFiles,
                messages: searchMessages
            },

            //stars
            stars: {
                list: starsList
            },

            //team
            team: {
                accessLogs: teamLogs,
                info: getTeamInfo
            },

            //users
            users: {
                getPresence: getUserPresence,
                info: getUserinfo,
                list: getUserslist,
                setActive: setUserActive,
                setPresence: setUserPresence
            },

            //Helpers
            InitToken: initToken,
            ExecuteApiMethod: executeApiCall,
            
            //groups
            groups: {
                archive: notImplemented,
                close: notImplemented,
                create: notImplemented,
                createChild: notImplemented,
                history: notImplemented,
                invite: notImplemented,
                kick: notImplemented,
                leave: notImplemented,
                list: notImplemented,
                mark: notImplemented,
                open: notImplemented,
                rename: notImplemented,
                setPurpose: notImplemented,
                setTopic: notImplemented,
                unarchive: notImplemented
            },

            //im
            im: {
                close: notImplemented,
                history: notImplemented,
                list: notImplemented,
                mark: notImplemented,
                open: notImplemented
            },
        };

        // USERS
        function getUserPresence(userId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            return executeApiCall("users.getPresence", params);
        }
        function getUserinfo(userId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            return executeApiCall("users.info", params);
        }
        function getUserslist(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("users.list", params);
        }
        function setUserActive(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("users.setActive", params);
        }
        function setUserPresence(status, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                presence: status
            };
            return executeApiCall("users.setPresence", params);
        }
        function startRtm(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("auth.test", params);
        }

        //AUTH
        function authorizeApp(clientId, params) {
            var qs = "&" + toQueryString(params);
            var url = slackConfig.OAuthUrl + "?client_id=" + clientId + qs;
            $window.location.href= url;
        }
        function initToken(token) {
            slackConfig.DefaultToken = token;
            return authTest(); //TODO test
        }
        function getAccessToken(client, secret, code) {
            var params = {
                client_id: client,
                client_secret: secret,
                code: code
            };
            return executeApiCall("oauth.access", params);
        }
        function authTest(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("auth.test", params);
        }
        // CHANNELS
        function archiveChannel(channeId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            return executeApiCall("channels.archive", params);
        }
        function channelUnarchive(channeId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            return executeApiCall("channels.unarchive", params);
        }
        function channelHistory(channeId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId
            };
            return executeApiCall("channels.history", params);
        }
        function channelInvite(channeId, userId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                user: userId
            };
            return executeApiCall("channels.invite", params);
        }
        function channelJoin(channeName, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeName
            };
            return executeApiCall("channels.join", params);
        }
        function channelKick(channelId, userId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                user: userId
            };
            return executeApiCall("channels.kick", params);
        }
        function channelleave(channelId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            return executeApiCall("channels.leave", params);
        }
        function channelMark(channelId, timeStamp, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                ts: timeStamp
            };
            return executeApiCall("channels.mark", params);
        }
        function channelRename(channelId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            return executeApiCall("channels.rename", params);
        }

        function channelSetPurpose(channelId, text, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                purpose: text
            };
            return executeApiCall("channels.setPurpose", params);
        }
        function channelSetTopic(channelId, text, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId,
                topic: text
            };
            return executeApiCall("channels.setTopic", params);
        }
        function getChannelList(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("channels.list", params);
        }
        function getChannel(channelId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channelId
            };
            return executeApiCall("channels.info", params);
        }
        function createChannel(channeName, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                name: channeName
            };
            return executeApiCall("channels.create", params);
        }

        // CHAT
        function postMessage(channeId, message, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                text: message
            };
            return executeApiCall("channels.info", params);
        }
        function deleteMessage(channeId, timestamp, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                ts: timestamp
            };
            return executeApiCall("chat.delete", params);
        }
        function updateMessage(channeId, timestamp, newMessage, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                channel: channeId,
                ts: timestamp,
                text: newMessage
            };
            return executeApiCall("chat.update", params);
        }

        // TEAM
        function getTeamInfo(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("team.info", params);
        }
        function teamLogs(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("team.accessLogs", params);
        }
        // FILES
        function deleteFile(fileId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                file: fileId
            };
            return executeApiCall("files.delete", params);
        }

        function getFileInfo(fileId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                file: fileId
            };
            return executeApiCall("files.info", params);
        }

        function listfiles(token) {
            var params = {
                token: token || slackConfig.DefaultToken
            };
            return executeApiCall("files.list", params);
        }
        function uploadFile(params) {

            params.token = token || slackConfig.DefaultToken;

            if (params.content) {
                var url = slackConfig.ApiUrl + "files.upload";
                executePostRequest(url, params);
            }

            return executeApiCall("files.upload", params);
        }

        // SEARCH
        function searchFiles(query, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            return executeApiCall("search.files", params);
        }
        function searchAll(query, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            return executeApiCall("search.all", params);
        }
        function searchMessages(query, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                query: query
            };
            return executeApiCall("search.messages", params);
        }

        // STARS
        function starsList(userId, token) {
            var params = {
                token: token || slackConfig.DefaultToken,
                user: userId
            };
            return executeApiCall("stars.list", params);
        }

        // HELPERS
        function executeApiCall(endpoint, paramsObj) {
            var qs = toQueryString(paramsObj);
            var url = slackConfig.ApiUrl + endpoint + "?" + qs;
            return executeGetRequest(url);
        }
        function executeGetRequest(url) {
            return $http.get(url)
                .then(function(result) {
                      return result.data;
                })
                .catch(function(response) {
                    $log.log(response.status);
                    $log.log(response.data);
                })
                .finally(function() {
                    
                });
        }
        function executePostRequest(url, data) {
            return $http.post(url, data)
                .then(function(result) {
                     result.data;
                })
                .catch(function(response) {
                    $log.log(response.status);
                    $log.log(response.data);
                })
                .finally(function() {
                    
                });
        }
        function toQueryString(obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
            }
            return parts.join("&");
        }

        function notImplemented() {
            $log.log("Method not implemented. Remind nickaranz@gmail.com to quit slacking");
        }

    }]);

})(angular);