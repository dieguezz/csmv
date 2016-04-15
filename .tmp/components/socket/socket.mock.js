'use strict';

angular.module('socketMock', []).factory('socket', function () {
  return {
    socket: {
      connect: function connect() {},
      on: function on() {},
      emit: function emit() {},
      receive: function receive() {}
    },

    syncUpdates: function syncUpdates() {},
    unsyncUpdates: function unsyncUpdates() {}
  };
});
//# sourceMappingURL=socket.mock.js.map
