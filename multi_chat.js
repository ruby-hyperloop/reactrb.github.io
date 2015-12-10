/* Generated by Opal 0.8.1 */
(function(Opal) {
  Opal.dynamic_require_severity = "error";
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$lambda', '$call', '$collect', '$new', '$_send', '$to_n', '$each']);
  return (function($base, $super) {
    function $MultiChat(){};
    var self = $MultiChat = $klass($base, $super, 'MultiChat', $MultiChat);

    var def = self.$$proto, $scope = self.$$scope, TMP_1;

    def.peer = def.id = def.connections = def.chats = def.block = nil;
    def.$initialize = TMP_1 = function(key, master_id, debug) {
      var $a, $b, TMP_2, self = this, $iter = TMP_1.$$p, block = $iter || nil, reformat_and_call_block = nil;

      if (debug == null) {
        debug = 0
      }
      TMP_1.$$p = null;
      self.block = block;
      self.chats = [];
      reformat_and_call_block = ($a = ($b = self).$lambda, $a.$$p = (TMP_2 = function(native_data_array){var self = TMP_2.$$s || this, $a, $b, TMP_3;
if (native_data_array == null) native_data_array = nil;
      return block.$call(($a = ($b = native_data_array).$collect, $a.$$p = (TMP_3 = function(item){var self = TMP_3.$$s || this;
if (item == null) item = nil;
        return $scope.get('Hash').$new(item)}, TMP_3.$$s = self, TMP_3), $a).call($b))}, TMP_2.$$s = self, TMP_2), $a).call($b);
      
      var logger = function(message) {
        if (debug > 1) console.log("MultiChat: "+message);
      }
      logger("creating new slave peer");
      self.peer = new Peer({key: key, debug: debug});
      logger("slave peer created");
      self.peer.on('error', function (err) {
        logger("error while connecting to Master, initializing as Master");
        self.id = "Master";
        reformat_and_call_block([]);
        logger("yielded empty message array to block");
        self.connections = [];
        logger("creating master peer");
        self.peer = new Peer(master_id, {key: key, debug: debug});
        logger("master peer created");
        self.peer.on('connection', function (new_conn) {
          logger("new connection to master, sending current chats");
          setTimeout(function() {
            new_conn.send(JSON.stringify(self.chats));
            logger("new connection to master, current chats sent");
          }, 2000);
          self.connections.push(new_conn);
          new_conn.on('data', function (data) {
            logger("received data from a slave");
            data = JSON.parse(data);
            logger("parsed slave data");
            reformat_and_call_block(data);
            logger("yielded slave data to block, sending data to other slaves");
            self["$_send"](data, new_conn);
            logger("data sent to other slaves");
          })
        })
      });
      master = self.peer.connect(master_id);
      logger("connection to master created");
      master.on('data', function(data) {
        logger("data received from master");
        reformat_and_call_block(JSON.parse(data));
        logger("data from master reported to application");
      })
      self.connections = [master]
    ;
    };

    def.$send = function(data) {
      var self = this;

      if (data == null) {
        data = $hash2([], {})
      }
      self.block.$call([data]);
      return self.$_send([data.$to_n()], nil);
    };

    def.$_send = function(data, originator) {
      var $a, $b, TMP_4, self = this;

      self.chats = $rb_plus(self.chats, data);
      return ($a = ($b = self.connections).$each, $a.$$p = (TMP_4 = function(connection){var self = TMP_4.$$s || this, $a;
if (connection == null) connection = nil;
      if ((($a = connection != originator) !== nil && (!$a.$$is_boolean || $a == true))) {
          return connection.send(JSON.stringify(data));
          } else {
          return nil
        }}, TMP_4.$$s = self, TMP_4), $a).call($b);
    };

    return (def.$id = function() {
      var $a, self = this;

      return ((($a = self.id) !== false && $a !== nil) ? $a : self.id = self.peer.id);
    }, nil) && 'id';
  })(self, null)
})(Opal);