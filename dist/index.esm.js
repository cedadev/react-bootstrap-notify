import React, { useState, useCallback, useMemo, createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Toast from 'react-bootstrap/Toast';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

const NotificationContext = /*#__PURE__*/createContext();
const NotificationProvider = _ref => {
  let children = _ref.children;
  // We maintain a next id and an array of notifications
  const _useState = useState({
      nextId: 0,
      data: []
    }),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  // Define functions for adding and removing notifications
  const addNotification = useCallback(notification => setState(state => ({
    nextId: state.nextId + 1,
    data: [...state.data, _objectSpread2(_objectSpread2({}, notification), {}, {
      id: state.nextId
    })]
  })), []);
  const removeNotification = useCallback(id => setState(state => _objectSpread2(_objectSpread2({}, state), {}, {
    data: state.data.filter(n => n.id !== id)
  })), []);
  // Make the state that will be passed to the context provider
  const providerState = useMemo(() => ({
    notifications: state.data,
    addNotification,
    removeNotification
  }), [state.data, addNotification, removeNotification]);
  // Return the provider component configured with the current state
  return /*#__PURE__*/React.createElement(NotificationContext.Provider, {
    value: providerState
  }, children);
};
const useNotifications = () => useContext(NotificationContext);

const Icons = {
  info: "fas fa-info-circle",
  success: "fas fa-check-circle",
  warning: "fas fa-exclamation-triangle",
  danger: "fas fa-exclamation-circle"
};
const Notification = _ref => {
  let notification = _ref.notification,
    onDismiss = _ref.onDismiss;
  const iconClasses = Icons[notification.level];
  const _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  const handleClose = () => {
    // Hide the notification to trigger the fade
    setVisible(false);
    // Run the callback once the transition is done
    setTimeout(onDismiss, 1000);
  };
  return /*#__PURE__*/React.createElement(Toast, {
    className: "notification border-".concat(notification.level),
    style: {
      borderWidth: '2px'
    },
    animation: true,
    show: visible,
    onClose: handleClose,
    autohide: !!notification.duration,
    delay: notification.duration
  }, /*#__PURE__*/React.createElement(Toast.Header, {
    className: "text-".concat(notification.level, " align-baseline")
  }, /*#__PURE__*/React.createElement("i", {
    className: "mr-2 fa-lg ".concat(iconClasses)
  }), /*#__PURE__*/React.createElement("strong", {
    className: "mr-auto"
  }, notification.title)), /*#__PURE__*/React.createElement(Toast.Body, null, notification.message));
};
const Notifications = () => {
  // Get the notifications from the store
  const _useNotifications = useNotifications(),
    notifications = _useNotifications.notifications,
    removeNotification = _useNotifications.removeNotification;
  // Render using a portal so that we can sit over other elements
  const _useState3 = useState(() => document.createElement('div')),
    _useState4 = _slicedToArray(_useState3, 1),
    container = _useState4[0];
  useEffect(() => {
    document.body.appendChild(container);
    return () => document.body.removeChild(container);
  }, [container]);
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      minWidth: '350px',
      zIndex: 1100
    },
    className: "p-3"
  }, notifications.map(notification => /*#__PURE__*/React.createElement(Notification, {
    key: notification.id,
    notification: notification,
    onDismiss: () => removeNotification(notification.id)
  }))), container);
};

// The hook that we export only provides the the addNotification function
const useAddNotification = () => useNotifications().addNotification;

export { NotificationProvider, Notifications as default, useAddNotification as useNotifications };
//# sourceMappingURL=index.esm.js.map
