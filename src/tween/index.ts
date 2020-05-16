/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds

// linear tweening - no easing
const linear = (t: number, b: number, c: number, d: number) => (c * t) / d + b;

// QUADRATIC t^2
// quadratic easing in - accelerating from zero velocity
const easeInQuad = (t: number, b: number, c: number, d: number) => c * (t /= d) * t + b;

// quadratic easing out - decelerating to zero velocity
const easeOutQuad = (t: number, b: number, c: number, d: number) => -c * (t /= d) * (t - 2) + b;

// quadratic easing in/out - acceleration until halfway, then deceleration
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};

// CUBIC t^3
// cubic easing in - accelerating from zero velocity
const easeInCubic = (t: number, b: number, c: number, d: number) => c * Math.pow(t / d, 3) + b;

// cubic easing out - decelerating to zero velocity
const easeOutCubic = (t: number, b: number, c: number, d: number) => c * (Math.pow(t / d - 1, 3) + 1) + b;

// cubic easing in/out - acceleration until halfway, then deceleration
const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 3) + b;
  return (c / 2) * (Math.pow(t - 2, 3) + 2) + b;
};

// QUARTIC t^4
// quartic easing in - accelerating from zero velocity
const easeInQuart = (t: number, b: number, c: number, d: number) => c * Math.pow(t / d, 4) + b;

// quartic easing out - decelerating to zero velocity
const easeOutQuart = (t: number, b: number, c: number, d: number) => -c * (Math.pow(t / d - 1, 4) - 1) + b;

// quartic easing in/out - acceleration until halfway, then deceleration
const easeInOutQuart = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 4) + b;
  return (-c / 2) * (Math.pow(t - 2, 4) - 2) + b;
};

// QUINTIC t^5
// quintic easing in - accelerating from zero velocity
const easeInQuint = (t: number, b: number, c: number, d: number) => c * Math.pow(t / d, 5) + b;

// quartic easing out - decelerating to zero velocity
const easeOutQuint = (t: number, b: number, c: number, d: number) => c * (Math.pow(t / d - 1, 5) + 1) + b;

// quartic easing in/out - acceleration until halfway, then deceleration
const easeInOutQuint = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 5) + b;
  return (c / 2) * (Math.pow(t - 2, 5) + 2) + b;
};

// sinusoidal easing in - accelerating from zero velocity
const easeInSine = (t: number, b: number, c: number, d: number) => -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;

// sinusoidal easing out - decelerating to zero velocity
const easeOutSine = (t: number, b: number, c: number, d: number) => c * Math.sin((t / d) * (Math.PI / 2)) + b;

// sinusoidal easing in/out - accelerating until halfway, then decelerating
const easeInOutSine = (t: number, b: number, c: number, d: number) => (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;

// EXPONENTIAL 2^t
// exponential easing in - accelerating from zero velocity
const easeInExpo = (t: number, b: number, c: number, d: number) => (t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b);

// exponential easing out - decelerating to zero velocity
const easeOutExpo = (t: number, b: number, c: number, d: number) =>
  t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;

// exponential easing in/out - accelerating until halfway, then decelerating
const easeInOutExpo = (t: number, b: number, c: number, d: number) => {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
};

// CIRCULAR sqrt(1-t^2)
// circular easing in - accelerating from zero velocity
const easeInCirc = (t: number, b: number, c: number, d: number) => -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;

// circular easing out - decelerating to zero velocity
const easeOutCirc = (t: number, b: number, c: number, d: number) => c * Math.sqrt(1 - (t = t / d - 1) * t) + b;

// circular easing in/out - acceleration until halfway, then deceleration
const easeInOutCirc = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

// ELASTIC exponentially decaying sine wave
// t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
const easeInElastic = (t: number, b: number, c: number, d: number, a: number = 0, p: number = 0) => {
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else {
    var s = (p / (2 * Math.PI)) * Math.asin(c / a);
  }
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
};

const easeOutElastic = (t: number, b: number, c: number, d: number, a: number = 0, p: number = 0) => {
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else {
    var s = (p / (2 * Math.PI)) * Math.asin(c / a);
  }
  return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
};

const easeInOutElastic = (t: number, b: number, c: number, d: number, a: number = 0, p: number = 0) => {
  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else {
    var s = (p / (2 * Math.PI)) * Math.asin(c / a);
  }
  if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b;
};

// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2
// back easing in - backtracking slightly, then reversing direction and moving to target
// t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
// t and d can be in frames or seconds/milliseconds
// s controls the amount of overshoot: higher s means greater overshoot
// s has a default value of 1.70158, which produces an overshoot of 10 percent
// s==0 produces cubic easing with no overshoot
const easeInBack = (t: number, b: number, c: number, d: number, s: number = 0) => {
  if (s == undefined) s = 1.70158;
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

// back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
const easeOutBack = (t: number, b: number, c: number, d: number, s: number = 0) => {
  if (s == undefined) s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

// back easing in/out - backtracking slightly, then reversing direction and moving to target,
// then overshooting target, reversing, and finally coming back to target
const easeInOutBack = (t: number, b: number, c: number, d: number, s: number = 0) => {
  if (s == undefined) s = 1.70158;
  if ((t /= d / 2) < 1) return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};

// BOUNCE EASING: exponentially decaying parabolic bounce
// bounce easing in
const easeInBounce = (t: number, b: number, c: number, d: number) => c - easeOutBounce(d - t, 0, c, d) + b;

// bounce easing out
const easeOutBounce = (t: number, b: number, c: number, d: number) => {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
};

// bounce easing in/out
const easeInOutBounce = (t: number, b: number, c: number, d: number) => {
  if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
  return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

const TWEEN_OPTIONS = {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBack,
  easeOutBack,
  easeInOutBack,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce
};

export const tweenProperty = (
  t: number,
  b: number,
  c: number,
  d: number,
  tweenType: string = 'linear',
  a: number = 0,
  p: number = 0,
  s: number = 0
): number => {
  const tweenFn = TWEEN_OPTIONS[tweenType];

  return tweenFn(t, b, c, d, a, p, s);
};

export const tweenObject = (
  tweenTarget: { x: number; y: number },
  tweenStart: { x: number; y: number },
  t: number,
  change: { x: number; y: number },
  d: number,
  tweenType: string = 'linear',
  a: number = 0,
  p: number = 0,
  s: number = 0
): void => {
  const tweenFn = TWEEN_OPTIONS[tweenType];

  tweenTarget.x = tweenFn(t, tweenStart.x, change.x, d, a, p, s);
  tweenTarget.y = tweenFn(t, tweenStart.y, change.y, d, a, p, s);
};
