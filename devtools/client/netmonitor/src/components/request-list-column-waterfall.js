/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const {
  createClass,
  DOM,
  PropTypes,
} = require("devtools/client/shared/vendor/react");
const { L10N } = require("../utils/l10n");
const { propertiesEqual } = require("../utils/request-utils");

const { div } = DOM;

const UPDATED_WATERFALL_PROPS = [
  "eventTimings",
  "fromCache",
  "fromServiceWorker",
  "totalTime",
];
// List of properties of the timing info we want to create boxes for
const TIMING_KEYS = ["blocked", "dns", "connect", "ssl", "send", "wait", "receive"];

const RequestListColumnWaterfall = createClass({
  displayName: "RequestListColumnWaterfall",

  propTypes: {
    firstRequestStartedMillis: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onWaterfallMouseDown: PropTypes.func.isRequired,
  },

  shouldComponentUpdate(nextProps) {
    return !propertiesEqual(UPDATED_WATERFALL_PROPS, this.props.item, nextProps.item) ||
      this.props.firstRequestStartedMillis !== nextProps.firstRequestStartedMillis;
  },

  render() {
    let { firstRequestStartedMillis, item, onWaterfallMouseDown } = this.props;
    const boxes = timingBoxes(item);

    return (
      div({
        className: "requests-list-column requests-list-waterfall",
        onMouseOver: function ({target}) {
          if (!target.title) {
            target.title = timingTooltip(item);
          }
        }
      },
        div({
          className: "requests-list-timings",
          style: {
            paddingInlineStart: `${item.startedMillis - firstRequestStartedMillis}px`,
          },
          onMouseDown: onWaterfallMouseDown,
        },
          boxes,
        )
      )
    );
  }
});

function timingTooltip(item) {
  let { eventTimings, fromCache, fromServiceWorker, totalTime } = item;
  let tooltip = [];

  if (fromCache || fromServiceWorker) {
    return tooltip;
  }

  if (eventTimings) {
    for (let key of TIMING_KEYS) {
      let width = eventTimings.timings[key];

      if (width > 0) {
        tooltip.push(L10N.getFormatStr("netmonitor.waterfall.tooltip." + key, width));
      }
    }
  }

  if (typeof totalTime === "number") {
    tooltip.push(L10N.getFormatStr("netmonitor.waterfall.tooltip.total", totalTime));
  }

  return tooltip.join(L10N.getStr("netmonitor.waterfall.tooltip.separator"));
}

function timingBoxes(item) {
  let { eventTimings, fromCache, fromServiceWorker, totalTime } = item;
  let boxes = [];

  if (fromCache || fromServiceWorker) {
    return boxes;
  }

  if (eventTimings) {
    // Add a set of boxes representing timing information.
    for (let key of TIMING_KEYS) {
      let width = eventTimings.timings[key];

      // Don't render anything if it surely won't be visible.
      // One millisecond == one unscaled pixel.
      if (width > 0) {
        boxes.push(
          div({
            key,
            className: `requests-list-timings-box ${key}`,
            style: { width },
          })
        );
      }
    }
  }

  if (typeof totalTime === "number") {
    let title = L10N.getFormatStr("networkMenu.totalMS", totalTime);
    boxes.push(
      div({
        key: "total",
        className: "requests-list-timings-total",
        title,
      }, title)
    );
  }

  return boxes;
}

module.exports = RequestListColumnWaterfall;
