/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "84cb0da2fc59d95bc357";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  components: {},\n  data: function data() {\n    return {};\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Views/Start.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _components_Todos__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/Todos */ \"./src/components/Todos.vue\");\n/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/Login */ \"./src/components/Login.vue\");\n/* harmony import */ var _services_generic__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/services/generic */ \"./src/services/generic.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    Todos: _components_Todos__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n    Login: _components_Login__WEBPACK_IMPORTED_MODULE_9__[\"default\"]\n  },\n  data: function data() {\n    return {\n      isUserLoggedInModal: false,\n      loading: false,\n      ShowTodos: false,\n      ShowInvoices: false,\n      LoadingSuccessfull: false,\n      LoadingError: false,\n      apiAdress: 'api/Categories/CreateNewCategory',\n      listOfTodos: [],\n      newTodo: {\n        title: ''\n      },\n      showRemoveDialog: false,\n      showCartDialog: false,\n      removeTodoId: null\n    };\n  },\n  methods: _objectSpread({\n    //setUpPage() {\n    //    if (this.userIsLoggedIn) {\n    //        this.getAllTodos();\n    //    } else {\n    //        this.isUserLoggedInModal = true;\n    //    }\n    //},\n    showCart: function showCart() {\n      this.showCartDialog = true;\n    }\n  }, Object(vuex__WEBPACK_IMPORTED_MODULE_12__[\"mapMutations\"])(['SET_NEW_CART_ITEM']), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_12__[\"mapActions\"])({\n    removeProductFromCart: 'REMOVE_PRODUCT_FROM_BASKET'\n  }), {\n    removeProduct: function removeProduct(id) {\n      this.removeProductFromCart(id);\n    },\n    addToCart: function addToCart(product) {\n      this.SET_NEW_CART_ITEM(product);\n    },\n    add: function add() {\n      var _this = this;\n\n      this.loading = true, this.listOfTodos.push({\n        id: this.nextId,\n        title: this.newTodo.title\n      });\n      var vm = {\n        name: this.newTodo.title,\n        published: false\n      };\n      _services_generic__WEBPACK_IMPORTED_MODULE_10__[\"default\"].add('Home/CreateNewCategory', vm).then(function () {\n        return _this.getAllTodos();\n      });\n      this.newTodo.title = '';\n    },\n    alertFunctionRemoveAlert: function alertFunctionRemoveAlert() {\n      this.LoadingSuccessfull = false;\n    },\n    alertFunctionInitialize: function alertFunctionInitialize() {\n      var _this2 = this;\n\n      this.LoadingSuccessfull = true;\n      setTimeout(function () {\n        _this2.alertFunctionRemoveAlert();\n      }, 2000);\n    },\n    alertFunctionSetAlert: function alertFunctionSetAlert() {\n      var _this3 = this;\n\n      setTimeout(function () {\n        _this3.alertFunctionInitialize();\n      }, 150);\n    },\n    getAllTodos: function getAllTodos() {\n      var _this4 = this;\n\n      axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('api/Home/GetConfigurations').then(function (response) {\n        _this4.listOfTodos = response.data;\n      });\n      this.loading = false;\n    },\n    removeFromList: function removeFromList(id) {\n      var _this5 = this;\n\n      _services_generic__WEBPACK_IMPORTED_MODULE_10__[\"default\"].delete('Home/DeleteById', id).then(function () {\n        return _this5.getAllTodos();\n      });\n      this.showRemoveDialog = false;\n    },\n    openRemoveDialogModal: function openRemoveDialogModal(id) {\n      this.showRemoveDialog = true;\n      this.removeTodoId = id;\n    },\n    markAsDone: function markAsDone(todo) {\n      var _this6 = this;\n\n      _services_generic__WEBPACK_IMPORTED_MODULE_10__[\"default\"].update('Home/MarkAsDone', todo).then(function () {\n        return _this6.getAllTodos();\n      });\n    }\n  }),\n  computed: _objectSpread({\n    nextId: function nextId() {\n      if (this.listOfTodos.length - 1 > 0) {\n        return this.listOfTodos[this.listOfTodos.length - 1].id + 1;\n      } else {\n        return 1;\n      }\n    }\n  }, Object(vuex__WEBPACK_IMPORTED_MODULE_12__[\"mapState\"])({\n    title: function title(state) {\n      return state.title;\n    },\n    cart: function cart(state) {\n      return state.cart;\n    },\n    isUserLoggedIn: function isUserLoggedIn(state) {\n      return state.login.isUserLoggedIn;\n    }\n  })),\n  mounted: function mounted() {\n    //this.setUpPage();\n    this.getAllTodos();\n  }\n});\n\n//# sourceURL=webpack:///./src/Views/Start.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapMutations\"])({\n    setUsername: 'login/SET_USERNAME',\n    setPassword: 'login/SET_PASSWORD'\n  }), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapActions\"])('login', {\n    userLogin: 'LOGIN'\n  }), {\n    login: function login() {\n      var data = {\n        vm: this.loginViewModel,\n        redirectUrl: this.redirectUrl\n      };\n      this.userLogin(data);\n    },\n    register: function register() {\n      this.$router.push('/register');\n    }\n  }),\n  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapState\"])({\n    loginViewModel: function loginViewModel(state) {\n      return state.login.loginViewModel;\n    },\n    errors: function errors(state) {\n      return state.login.errors;\n    },\n    redirectUrl: function redirectUrl(state) {\n      return state.login.redirectUrl;\n    }\n  }), {\n    password: {\n      get: function get() {\n        return this.loginViewModel.password;\n      },\n      set: function set(value) {\n        this.setPassword(value);\n      }\n    },\n    username: {\n      get: function get() {\n        return this.loginViewModel.username;\n      },\n      set: function set(value) {\n        this.setUsername(value);\n      }\n    },\n    rememberMe: {\n      get: function get() {\n        return this.loginViewModel.rememberMe;\n      },\n      set: function set(value) {\n        this.setRememberMe(value);\n      }\n    },\n    themeMode: {\n      get: function get() {\n        return this.$vuetify.theme.dark;\n      }\n    }\n  })\n});\n\n//# sourceURL=webpack:///./src/components/Login.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RegisterUserForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_alexa_source_repos_vueproject_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      agreementDialog: false,\n      valid: true,\n      agreed: false,\n      firstName: '',\n      firstNameRules: [function (v) {\n        return !!v || 'First name is required';\n      }, function (v) {\n        return v && v.length <= 40 || 'First name must be less than 40 characters';\n      }],\n      lastName: '',\n      lastNameRules: [function (v) {\n        return !!v || 'Last name is required';\n      }, function (v) {\n        return v && v.length <= 40 || 'Last name must be less than 40 characters';\n      }],\n      email: '',\n      emailRules: [function (v) {\n        return !!v || 'E-mail is required';\n      }, function (v) {\n        return /.+@.+/.test(v) || 'E-mail must be valid';\n      }],\n      password: '',\n      passwordRules: [function (v) {\n        return !!v || 'Password is required';\n      }, function (v) {\n        return v && v.length >= 8 || 'Password must contain at least 8 characters';\n      }],\n      retypedPassword: '',\n      retypedPasswordRules: [function (v) {\n        return !!v || 'Retyped password is required';\n      }, function (v) {\n        return v && v.length >= 8 || 'Retyped password must contain at least 8 characters';\n      }]\n    };\n  },\n  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapActions\"])({\n    registerNewUser: 'login/REGISTER_NEW_USER'\n  }), {\n    register: function register() {\n      if (this.password === this.retypedPassword) {\n        this.registerNewUser({\n          vm: {\n            firstName: this.firstName,\n            lastName: this.lastName,\n            email: this.email,\n            password: this.password\n          },\n          //TODO redirect on register hehe\n          redirectUrl: '/'\n        });\n      } else {//TODO: return validation error\n      }\n    }\n  }),\n  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__[\"mapState\"])({\n    redirectUrl: function redirectUrl(state) {\n      return state.login.redirectUrl;\n    }\n  })),\n  components: {}\n});\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Todos.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    listOfTodos: Array\n  },\n  data: function data() {\n    return {};\n  },\n  methods: {\n    removeItem: function removeItem(id) {\n      this.$emit('openRemoveDialog', id);\n    },\n    addToCart: function addToCart(product) {\n      this.$emit('addToCart', product);\n    },\n    markAsDone: function markAsDone(todo) {\n      this.overlay = true, this.$emit('done', todo);\n      /* eslint-disable no-console */\n\n      console.log(todo);\n      /* eslint-enable no-console */\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/Todos.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"aa2a2d38-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-app\",\n    [\n      _c(\n        \"v-content\",\n        [\n          _c(\n            \"div\",\n            [\n              _c(\n                \"v-toolbar\",\n                [\n                  _c(\"v-toolbar-title\", [\n                    _vm._v(\"To-Do Software Solutions [beta]\")\n                  ]),\n                  _c(\"v-spacer\"),\n                  _c(\n                    \"v-toolbar-items\",\n                    [\n                      _c(\n                        \"v-btn\",\n                        { attrs: { text: \"\" } },\n                        [\n                          _c(\"router-link\", { attrs: { to: \"/\" } }, [\n                            _vm._v(\"Start\")\n                          ])\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-btn\",\n                        { attrs: { text: \"\" } },\n                        [\n                          _c(\"router-link\", { attrs: { to: \"/Login\" } }, [\n                            _vm._v(\"Login\")\n                          ])\n                        ],\n                        1\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          ),\n          _c(\"router-view\")\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22aa2a2d38-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"aa2a2d38-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _vm.LoadingSuccessfull\n        ? _c(\n            \"div\",\n            [\n              _c(\"v-alert\", { attrs: { type: \"success\" } }, [\n                _vm._v(\" Operation completed successfully \")\n              ])\n            ],\n            1\n          )\n        : _vm._e(),\n      _vm.LoadingError\n        ? _c(\n            \"div\",\n            [\n              _c(\"v-alert\", { attrs: { type: \"error\" } }, [\n                _vm._v(\" Error encountered while loading \")\n              ])\n            ],\n            1\n          )\n        : _vm._e(),\n      [\n        _c(\n          \"v-row\",\n          { attrs: { justify: \"center\" } },\n          [\n            _c(\n              \"v-dialog\",\n              {\n                attrs: { \"max-width\": \"400\" },\n                model: {\n                  value: _vm.isUserLoggedInModal,\n                  callback: function($$v) {\n                    _vm.isUserLoggedInModal = $$v\n                  },\n                  expression: \"isUserLoggedInModal\"\n                }\n              },\n              [_c(\"v-card\", [_c(\"Login\")], 1)],\n              1\n            )\n          ],\n          1\n        )\n      ],\n      _c(\n        \"v-card\",\n        {\n          staticClass: \"mt-5 pa-3 mx-auto\",\n          attrs: { shaped: \"\", raised: \"\", \"max-width\": \"344\" }\n        },\n        [\n          _c(\"v-text-field\", {\n            attrs: { type: \"text\", placeholder: \"Add a new todo\" },\n            on: {\n              keyup: function($event) {\n                if (\n                  !$event.type.indexOf(\"key\") &&\n                  _vm._k($event.keyCode, \"enter\", 13, $event.key, \"Enter\")\n                ) {\n                  return null\n                }\n                return _vm.add()\n              }\n            },\n            model: {\n              value: _vm.newTodo.title,\n              callback: function($$v) {\n                _vm.$set(_vm.newTodo, \"title\", $$v)\n              },\n              expression: \"newTodo.title\"\n            }\n          }),\n          _c(\n            \"v-btn\",\n            {\n              attrs: {\n                tile: \"\",\n                color: \"accent\",\n                elevation: \"10\",\n                loading: _vm.loading\n              },\n              on: {\n                click: function($event) {\n                  return _vm.add()\n                }\n              }\n            },\n            [\n              _c(\"v-icon\", { staticClass: \"pr-3\" }, [\n                _vm._v(\"mdi-plus-circle\")\n              ]),\n              _vm._v(\" Lägg till Todo \")\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _c(\"v-btn\", { on: { click: _vm.showCart } }, [\n        _c(\"h1\", [_vm._v(_vm._s(_vm.title) + \" \" + _vm._s(_vm.cart.length))])\n      ]),\n      _c(\"Todos\", {\n        attrs: { listOfTodos: _vm.listOfTodos },\n        on: {\n          addToCart: _vm.addToCart,\n          openRemoveDialog: _vm.openRemoveDialogModal,\n          done: _vm.markAsDone\n        }\n      }),\n      _c(\n        \"v-dialog\",\n        {\n          attrs: { \"max-width\": \"310\" },\n          model: {\n            value: _vm.showRemoveDialog,\n            callback: function($$v) {\n              _vm.showRemoveDialog = $$v\n            },\n            expression: \"showRemoveDialog\"\n          }\n        },\n        [\n          _c(\n            \"v-card\",\n            [\n              _c(\"v-card-title\", { staticClass: \"headline\" }, [\n                _vm._v(\"Är du säker att du vill ta bort?\")\n              ]),\n              _c(\"v-card-text\", [_vm._v(\" Detta kan inte ångras ;) \")]),\n              _c(\n                \"v-card-actions\",\n                [\n                  _c(\"v-spacer\"),\n                  _c(\n                    \"v-btn\",\n                    {\n                      attrs: { text: \"\", color: \"success\" },\n                      on: {\n                        click: function($event) {\n                          _vm.showRemoveDialog = false\n                        }\n                      }\n                    },\n                    [_vm._v(\" AVBRYT \")]\n                  ),\n                  _c(\n                    \"v-btn\",\n                    {\n                      attrs: { color: \"error\" },\n                      on: {\n                        click: function($event) {\n                          return _vm.removeFromList(_vm.removeTodoId)\n                        }\n                      }\n                    },\n                    [\n                      _c(\"v-icon\", { staticClass: \"pr-1\" }, [\n                        _vm._v(\"mdi-delete-circle\")\n                      ]),\n                      _vm._v(\" TA BORT \")\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _c(\n        \"v-dialog\",\n        {\n          attrs: { \"max-width\": \"400\" },\n          model: {\n            value: _vm.showCartDialog,\n            callback: function($$v) {\n              _vm.showCartDialog = $$v\n            },\n            expression: \"showCartDialog\"\n          }\n        },\n        [\n          _c(\n            \"v-card\",\n            [\n              _c(\"v-card-title\", { staticClass: \"headline\" }, [\n                _vm._v(\"Kundvagn\")\n              ]),\n              _c(\n                \"v-card-text\",\n                _vm._l(_vm.cart, function(product, index) {\n                  return _c(\"div\", { key: index, staticClass: \"pa-1\" }, [\n                    _vm._v(\" hello \"),\n                    _c(\n                      \"div\",\n                      {\n                        staticStyle: {\n                          color: \"black\",\n                          \"font-weight\": \"bold\",\n                          \"font-size\": \"24px\",\n                          padding: \"10px\"\n                        }\n                      },\n                      [\n                        _c(\n                          \"v-layout\",\n                          { attrs: { wrap: \"\" } },\n                          [\n                            _c(\n                              \"v-flex\",\n                              [\n                                _c(\n                                  \"v-card\",\n                                  { staticClass: \"pa-2\" },\n                                  [\n                                    _c(\n                                      \"p\",\n                                      {\n                                        staticClass:\n                                          \"subtitle-2 font-weight-thin\"\n                                      },\n                                      [_vm._v(\"Artnr. \" + _vm._s(product.id))]\n                                    ),\n                                    _c(\n                                      \"p\",\n                                      {\n                                        staticClass: \"display-1\",\n                                        staticStyle: {\n                                          \"text-transform\": \"uppercase\",\n                                          \"font-weight\": \"normal\"\n                                        }\n                                      },\n                                      [_vm._v(_vm._s(product.name))]\n                                    ),\n                                    _c(\"p\", { staticClass: \"subtitle-2\" }, [\n                                      _vm._v(\n                                        \"Tillgänglighet: \" +\n                                          _vm._s(product.published)\n                                      )\n                                    ]),\n                                    _c(\n                                      \"v-card\",\n                                      { attrs: { \"max-width\": \"190\" } },\n                                      [\n                                        _c(\n                                          \"v-card-actions\",\n                                          [\n                                            _c(\n                                              \"v-btn\",\n                                              {\n                                                attrs: {\n                                                  text: \"\",\n                                                  small: \"\",\n                                                  color: \"error\"\n                                                }\n                                              },\n                                              [\n                                                _c(\"v-icon\", [\n                                                  _vm._v(\"mdi-plus-circle\")\n                                                ])\n                                              ],\n                                              1\n                                            ),\n                                            _c(\n                                              \"v-btn\",\n                                              {\n                                                attrs: {\n                                                  text: \"\",\n                                                  small: \"\",\n                                                  disabled: \"\",\n                                                  color: \"error\"\n                                                }\n                                              },\n                                              [_vm._v(_vm._s(product.id - 50))]\n                                            ),\n                                            _c(\n                                              \"v-btn\",\n                                              {\n                                                attrs: {\n                                                  text: \"\",\n                                                  small: \"\",\n                                                  color: \"error\"\n                                                }\n                                              },\n                                              [\n                                                _c(\"v-icon\", [\n                                                  _vm._v(\"mdi-minus-circle\")\n                                                ])\n                                              ],\n                                              1\n                                            )\n                                          ],\n                                          1\n                                        )\n                                      ],\n                                      1\n                                    ),\n                                    _c(\n                                      \"v-card-actions\",\n                                      [\n                                        _c(\"v-spacer\"),\n                                        _c(\n                                          \"v-btn\",\n                                          {\n                                            attrs: {\n                                              text: \"\",\n                                              small: \"\",\n                                              color: \"error\"\n                                            },\n                                            on: {\n                                              click: function($event) {\n                                                return _vm.removeProduct(index)\n                                              }\n                                            }\n                                          },\n                                          [_vm._v(\"Ta bort\")]\n                                        )\n                                      ],\n                                      1\n                                    )\n                                  ],\n                                  1\n                                )\n                              ],\n                              1\n                            )\n                          ],\n                          1\n                        )\n                      ],\n                      1\n                    )\n                  ])\n                }),\n                0\n              ),\n              _c(\n                \"v-card-actions\",\n                [\n                  _c(\"v-spacer\"),\n                  _c(\"v-btn\", { attrs: { text: \"\", color: \"secondary\" } }, [\n                    _vm._v(\" fortsätt handla \")\n                  ]),\n                  _c(\n                    \"v-btn\",\n                    {\n                      staticStyle: { color: \"white\" },\n                      attrs: { color: \"orange\" }\n                    },\n                    [\n                      _c(\"v-icon\", { staticClass: \"pr-1\" }, [\n                        _vm._v(\"mdi-delete-circle\")\n                      ]),\n                      _vm._v(\" till kassan \")\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/Views/Start.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22aa2a2d38-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"aa2a2d38-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-form\",\n    { staticClass: \"pa-5\" },\n    [\n      _c(\n        \"v-layout\",\n        { attrs: { row: \"\", wrap: \"\", \"text-center\": \"\" } },\n        [\n          _c(\n            \"v-flex\",\n            { attrs: { xs12: \"\" } },\n            [\n              _c(\"v-text-field\", {\n                attrs: { type: \"email\", label: \"Username\" },\n                model: {\n                  value: _vm.username,\n                  callback: function($$v) {\n                    _vm.username = $$v\n                  },\n                  expression: \"username\"\n                }\n              }),\n              _c(\"v-text-field\", {\n                attrs: { type: \"password\", label: \"Password\" },\n                model: {\n                  value: _vm.password,\n                  callback: function($$v) {\n                    _vm.password = $$v\n                  },\n                  expression: \"password\"\n                }\n              }),\n              _c(\n                \"v-btn\",\n                {\n                  attrs: { large: \"\", color: \"primary\" },\n                  on: {\n                    click: function($event) {\n                      return _vm.login()\n                    }\n                  }\n                },\n                [_vm._v(\"Log in\")]\n              ),\n              _c(\"div\", { staticClass: \"mt-10 justify-center line-wrapper\" }, [\n                _c(\"div\", [\n                  _c(\"div\", {\n                    staticClass: \"line\",\n                    class: _vm.themeMode ? \"light\" : \"dark\"\n                  }),\n                  _vm._v(\" Log in or \"),\n                  _c(\"div\", {\n                    staticClass: \"line\",\n                    class: _vm.themeMode ? \"light\" : \"dark\"\n                  })\n                ])\n              ]),\n              _c(\n                \"v-btn\",\n                {\n                  staticClass: \"mt-10\",\n                  attrs: { large: \"\", color: \"success\" },\n                  on: { click: _vm.register }\n                },\n                [_vm._v(\"Sign up\")]\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Login.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22aa2a2d38-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"aa2a2d38-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-card\",\n    { staticClass: \"pa-2\" },\n    [\n      _c(\n        \"div\",\n        { staticClass: \"text-center\" },\n        [\n          _c(\n            \"v-dialog\",\n            {\n              attrs: { width: \"500\" },\n              model: {\n                value: _vm.agreementDialog,\n                callback: function($$v) {\n                  _vm.agreementDialog = $$v\n                },\n                expression: \"agreementDialog\"\n              }\n            },\n            [\n              _c(\n                \"v-card\",\n                [\n                  _c(\n                    \"v-card-title\",\n                    {\n                      staticClass: \"headline grey lighten-2\",\n                      attrs: { \"primary-title\": \"\" }\n                    },\n                    [_vm._v(\" Terms of use \")]\n                  ),\n                  _c(\"v-card-text\", [\n                    _vm._v(\n                      \" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \"\n                    )\n                  ]),\n                  _c(\"v-divider\"),\n                  _c(\n                    \"v-card-actions\",\n                    [\n                      _c(\"v-spacer\"),\n                      _c(\n                        \"v-btn\",\n                        {\n                          attrs: { color: \"primary\", text: \"\" },\n                          on: {\n                            click: function($event) {\n                              _vm.agreementDialog = !_vm.agreementDialog\n                            }\n                          }\n                        },\n                        [_vm._v(\" I accept \")]\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _c(\n        \"h1\",\n        {},\n        [\n          _c(\"v-icon\", { attrs: { large: \"\" } }, [_vm._v(\"mdi-account-plus\")]),\n          _vm._v(\" Register \")\n        ],\n        1\n      ),\n      _c(\n        \"v-form\",\n        {\n          ref: \"form\",\n          staticStyle: { width: \"100%\" },\n          attrs: { \"lazy-validation\": \"\" },\n          model: {\n            value: _vm.valid,\n            callback: function($$v) {\n              _vm.valid = $$v\n            },\n            expression: \"valid\"\n          }\n        },\n        [\n          _c(\n            \"v-layout\",\n            { staticClass: \"pa-3\", attrs: { row: \"\", wrap: \"\" } },\n            [\n              _c(\n                \"v-flex\",\n                {\n                  staticClass: \"px-2\",\n                  attrs: { xs12: \"\", sm12: \"\", md6: \"\", lg6: \"\", xl6: \"\" }\n                },\n                [\n                  _c(\"v-text-field\", {\n                    attrs: {\n                      label: \"First name\",\n                      placeholder: \"First name\",\n                      counter: 40,\n                      rules: _vm.firstNameRules,\n                      required: \"\"\n                    },\n                    model: {\n                      value: _vm.firstName,\n                      callback: function($$v) {\n                        _vm.firstName = $$v\n                      },\n                      expression: \"firstName\"\n                    }\n                  }),\n                  _c(\"v-text-field\", {\n                    attrs: {\n                      label: \"Last name\",\n                      placeholder: \"Last name\",\n                      counter: 40,\n                      rules: _vm.lastNameRules,\n                      required: \"\"\n                    },\n                    model: {\n                      value: _vm.lastName,\n                      callback: function($$v) {\n                        _vm.lastName = $$v\n                      },\n                      expression: \"lastName\"\n                    }\n                  }),\n                  _c(\"v-text-field\", {\n                    attrs: {\n                      label: \"E-mail address\",\n                      placeholder: \"E-mail address\",\n                      rules: _vm.emailRules,\n                      required: \"\"\n                    },\n                    model: {\n                      value: _vm.email,\n                      callback: function($$v) {\n                        _vm.email = $$v\n                      },\n                      expression: \"email\"\n                    }\n                  })\n                ],\n                1\n              ),\n              _c(\n                \"v-flex\",\n                {\n                  staticClass: \"px-2\",\n                  attrs: { xs12: \"\", sm12: \"\", md6: \"\", lg6: \"\", xl6: \"\" }\n                },\n                [\n                  _c(\"v-text-field\", {\n                    attrs: {\n                      label: \"Password\",\n                      placeholder: \"Password\",\n                      counter: 15,\n                      rules: _vm.passwordRules,\n                      required: \"\"\n                    },\n                    model: {\n                      value: _vm.password,\n                      callback: function($$v) {\n                        _vm.password = $$v\n                      },\n                      expression: \"password\"\n                    }\n                  }),\n                  _c(\"v-text-field\", {\n                    attrs: {\n                      label: \"Retype password\",\n                      placeholder: \"Retype password\",\n                      counter: 15,\n                      rules: _vm.retypedPasswordRules,\n                      required: \"\"\n                    },\n                    model: {\n                      value: _vm.retypedPassword,\n                      callback: function($$v) {\n                        _vm.retypedPassword = $$v\n                      },\n                      expression: \"retypedPassword\"\n                    }\n                  }),\n                  _c(\"v-checkbox\", {\n                    attrs: {\n                      color: \"primary\",\n                      label:\n                        \"\\n                           I agree to the terms of use.\"\n                    },\n                    model: {\n                      value: _vm.agreed,\n                      callback: function($$v) {\n                        _vm.agreed = $$v\n                      },\n                      expression: \"agreed\"\n                    }\n                  }),\n                  _c(\n                    \"v-btn\",\n                    {\n                      attrs: { text: \"\", color: \"primary\" },\n                      on: {\n                        click: function($event) {\n                          _vm.agreementDialog = !_vm.agreementDialog\n                        }\n                      }\n                    },\n                    [_vm._v(\"Terms of use\")]\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _c(\n        \"v-card-actions\",\n        [\n          _c(\"v-spacer\"),\n          _c(\n            \"v-btn\",\n            {\n              attrs: { disabled: !_vm.valid, color: \"success\" },\n              on: {\n                click: function($event) {\n                  return _vm.register()\n                }\n              }\n            },\n            [_vm._v(\" Skicka \")]\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22aa2a2d38-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"aa2a2d38-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-container\",\n    { attrs: { fluid: \"\" } },\n    [\n      _c(\n        \"v-col\",\n        { attrs: { cols: \"12\" } },\n        [\n          _c(\n            \"v-row\",\n            { attrs: { align: \"center\", justify: \"center\" } },\n            _vm._l(_vm.listOfTodos, function(todo, index) {\n              return _c(\n                \"div\",\n                { key: index },\n                [\n                  _c(\n                    \"v-layout\",\n                    { attrs: { \"justify-center\": \"\", wrap: \"\" } },\n                    [\n                      _c(\n                        \"v-flex\",\n                        {\n                          attrs: {\n                            xs10: \"\",\n                            sm10: \"\",\n                            md10: \"\",\n                            \"fill-height\": \"\"\n                          }\n                        },\n                        [\n                          _c(\n                            \"v-card\",\n                            {\n                              staticClass: \"mx-auto ma-5\",\n                              attrs: { \"max-width\": \"400\" }\n                            },\n                            [\n                              _c(\n                                \"v-img\",\n                                {\n                                  staticClass: \"white--text align-end\",\n                                  attrs: {\n                                    height: \"200px\",\n                                    src:\n                                      \"https://cdn.vuetifyjs.com/images/cards/docks.jpg\"\n                                  }\n                                },\n                                [\n                                  _c(\"v-card-title\", [\n                                    _vm._v(\" \" + _vm._s(todo.name))\n                                  ])\n                                ],\n                                1\n                              ),\n                              _c(\"v-card-subtitle\", { staticClass: \"pb-0\" }, [\n                                _vm._v(\"ToDo nummer \" + _vm._s(todo.id))\n                              ]),\n                              todo.published == false\n                                ? _c(\n                                    \"v-card-text\",\n                                    { staticClass: \"text--primary\" },\n                                    [\n                                      _c(\n                                        \"v-chip\",\n                                        {\n                                          staticStyle: { color: \"white\" },\n                                          attrs: { color: \"deep-orange\" }\n                                        },\n                                        [_vm._v(\"Pågående\")]\n                                      )\n                                    ],\n                                    1\n                                  )\n                                : _c(\n                                    \"v-card-text\",\n                                    { staticClass: \"text--primary\" },\n                                    [\n                                      _c(\n                                        \"v-chip\",\n                                        { attrs: { color: \"success\" } },\n                                        [_vm._v(\"Färdig\")]\n                                      )\n                                    ],\n                                    1\n                                  ),\n                              _c(\n                                \"v-card-actions\",\n                                { staticClass: \"pa-0\" },\n                                [\n                                  _c(\n                                    \"v-btn\",\n                                    {\n                                      attrs: { color: \"red\", text: \"\" },\n                                      on: {\n                                        click: function($event) {\n                                          return _vm.removeItem(todo.id)\n                                        }\n                                      }\n                                    },\n                                    [_vm._v(\"Ta bort\")]\n                                  ),\n                                  _c(\n                                    \"v-btn\",\n                                    {\n                                      attrs: { color: \"primary\", text: \"\" },\n                                      on: {\n                                        click: function($event) {\n                                          return _vm.addToCart(todo)\n                                        }\n                                      }\n                                    },\n                                    [_vm._v(\"+ kundvagn\")]\n                                  ),\n                                  _c(\"v-spacer\"),\n                                  todo.published == false\n                                    ? _c(\n                                        \"v-btn\",\n                                        {\n                                          attrs: { color: \"green\", text: \"\" },\n                                          on: {\n                                            click: function($event) {\n                                              return _vm.markAsDone(todo)\n                                            }\n                                          }\n                                        },\n                                        [_vm._v(\"Färdig\")]\n                                      )\n                                    : _c(\n                                        \"v-btn\",\n                                        {\n                                          attrs: { color: \"orange\", text: \"\" },\n                                          on: {\n                                            click: function($event) {\n                                              return _vm.markAsDone(todo)\n                                            }\n                                          }\n                                        },\n                                        [_vm._v(\"Pågår\")]\n                                      )\n                                ],\n                                1\n                              )\n                            ],\n                            1\n                          )\n                        ],\n                        1\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            }),\n            0\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Todos.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22aa2a2d38-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.LF[data-v-cdc37d10] {\\n    background-color:black;\\n    color:white;\\n}\\n.HF[data-v-cdc37d10] {\\n    background-color: orange;\\n    color: white;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/Views/Start.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.line[data-v-ef68022e] {\\n    height: 1px;\\n    width: 20%;\\n    display: inline-block;\\n    margin-bottom: 10px;\\n    margin-right: 7px;\\n}\\n.line-wrapper[data-v-ef68022e] {\\n    font-size: 40px;\\n    font-weight: 200;\\n    margin: 0 auto;\\n    width: 100%;\\n}\\n.light[data-v-ef68022e] {\\n    background-color: #fff;\\n    color: #000;\\n}\\n.dark[data-v-ef68022e] {\\n    background-color: #000;\\n    color: #fff;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/Login.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.hidden[data-v-9f29e3bc] {\\n    display: none;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.btn[data-v-d37f6326] {\\n    position: relative;\\n    display: block;\\n    margin: 30px auto;\\n    padding: 0;\\n    overflow: hidden;\\n    border-width: 0;\\n    outline: none;\\n    border-radius: 2px;\\n    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\\n            box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\\n    background-color: #2ecc71;\\n    color: #ecf0f1;\\n    -webkit-transition: background-color .3s;\\n    transition: background-color .3s;\\n}\\n.btn[data-v-d37f6326]:hover, .btn[data-v-d37f6326]:focus {\\n        background-color: #27ae60;\\n}\\n.btn > *[data-v-d37f6326] {\\n        position: relative;\\n}\\n.btn span[data-v-d37f6326] {\\n        display: block;\\n        padding: 12px 24px;\\n}\\n.btn[data-v-d37f6326]:before {\\n        content: \\\"\\\";\\n        position: absolute;\\n        top: 50%;\\n        left: 50%;\\n        display: block;\\n        width: 0;\\n        padding-top: 0;\\n        border-radius: 100%;\\n        background-color: rgba(236, 240, 241, .3);\\n        -webkit-transform: translate(-50%, -50%);\\n        transform: translate(-50%, -50%);\\n}\\n.btn[data-v-d37f6326]:active:before {\\n        width: 120%;\\n        padding-top: 120%;\\n        -webkit-transition: width .2s ease-out, padding-top .2s ease-out;\\n        transition: width .2s ease-out, padding-top .2s ease-out;\\n}\\n\\n/* Styles, not important */\\n*[data-v-d37f6326], *[data-v-d37f6326]:before, *[data-v-d37f6326]:after {\\n    -webkit-box-sizing: border-box;\\n            box-sizing: border-box;\\n}\\nhtml[data-v-d37f6326] {\\n    position: relative;\\n    height: 100%;\\n}\\nbody[data-v-d37f6326] {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    -webkit-transform: translate(-50%, -50%);\\n    transform: translate(-50%, -50%);\\n    background-color: #ecf0f1;\\n    color: #34495e;\\n    font-family: Trebuchet, Arial, sans-serif;\\n    text-align: center;\\n}\\nh2[data-v-d37f6326] {\\n    font-weight: normal;\\n}\\n.btn.orange[data-v-d37f6326] {\\n    background-color: #e67e22;\\n}\\n.btn.orange[data-v-d37f6326]:hover, .btn.orange[data-v-d37f6326]:focus {\\n        background-color: #d35400;\\n}\\n.btn.red[data-v-d37f6326] {\\n    background-color: #e74c3c;\\n}\\n.btn.red[data-v-d37f6326]:hover, .btn.red[data-v-d37f6326]:focus {\\n        background-color: #c0392b;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/Todos.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"995d8102\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(true) {\n // When the styles change, update the <style> tags\n if(!content.locals) {\n   module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&\", function() {\n     var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&\");\n     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n     update(newContent);\n   });\n }\n // When the module is disposed, remove the <style> tags\n module.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/Views/Start.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"aeeb6a64\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(true) {\n // When the styles change, update the <style> tags\n if(!content.locals) {\n   module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&\", function() {\n     var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&\");\n     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n     update(newContent);\n   });\n }\n // When the module is disposed, remove the <style> tags\n module.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/components/Login.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"38c7def1\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(true) {\n // When the styles change, update the <style> tags\n if(!content.locals) {\n   module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&\", function() {\n     var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&\");\n     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n     update(newContent);\n   });\n }\n // When the module is disposed, remove the <style> tags\n module.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"b80ad122\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(true) {\n // When the styles change, update the <style> tags\n if(!content.locals) {\n   module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&\", function() {\n     var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&\");\n     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n     update(newContent);\n   });\n }\n // When the module is disposed, remove the <style> tags\n module.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/components/Todos.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/vuetify-loader/lib/loader.js??ref--18-0!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VApp */ \"./node_modules/vuetify/lib/components/VApp/index.js\");\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VContent */ \"./node_modules/vuetify/lib/components/VContent/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ \"./node_modules/vuetify/lib/components/VToolbar/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__[\"VApp\"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VContent: vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_6__[\"VContent\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VSpacer\"],VToolbar: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_8__[\"VToolbar\"],VToolbarItems: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_8__[\"VToolbarItems\"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_8__[\"VToolbarTitle\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('7ba5bd90')) {\n      api.createRecord('7ba5bd90', component.options)\n    } else {\n      api.reload('7ba5bd90', component.options)\n    }\n    module.hot.accept(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n(function () {\n      api.rerender('7ba5bd90', {\n        render: _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"aa2a2d38-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/Views/Start.vue":
/*!*****************************!*\
  !*** ./src/Views/Start.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Start.vue?vue&type=template&id=cdc37d10&scoped=true& */ \"./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&\");\n/* harmony import */ var _Start_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Start.vue?vue&type=script&lang=js& */ \"./src/Views/Start.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& */ \"./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAlert */ \"./node_modules/vuetify/lib/components/VAlert/index.js\");\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ \"./node_modules/vuetify/lib/components/VDialog/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Start_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"cdc37d10\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VAlert: vuetify_lib_components_VAlert__WEBPACK_IMPORTED_MODULE_5__[\"VAlert\"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__[\"VCard\"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__[\"VCardActions\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__[\"VCardText\"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__[\"VCardTitle\"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__[\"VDialog\"],VFlex: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_9__[\"VFlex\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__[\"VIcon\"],VLayout: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_9__[\"VLayout\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_9__[\"VRow\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_9__[\"VSpacer\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_11__[\"VTextField\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('cdc37d10')) {\n      api.createRecord('cdc37d10', component.options)\n    } else {\n      api.reload('cdc37d10', component.options)\n    }\n    module.hot.accept(/*! ./Start.vue?vue&type=template&id=cdc37d10&scoped=true& */ \"./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Start.vue?vue&type=template&id=cdc37d10&scoped=true& */ \"./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&\");\n(function () {\n      api.rerender('cdc37d10', {\n        render: _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/Views/Start.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/Views/Start.vue?");

/***/ }),

/***/ "./src/Views/Start.vue?vue&type=script&lang=js&":
/*!******************************************************!*\
  !*** ./src/Views/Start.vue?vue&type=script&lang=js& ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/Views/Start.vue?");

/***/ }),

/***/ "./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&":
/*!**************************************************************************************!*\
  !*** ./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=style&index=0&id=cdc37d10&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_style_index_0_id_cdc37d10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/Views/Start.vue?");

/***/ }),

/***/ "./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&":
/*!************************************************************************!*\
  !*** ./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Start.vue?vue&type=template&id=cdc37d10&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"aa2a2d38-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/Views/Start.vue?vue&type=template&id=cdc37d10&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Start_vue_vue_type_template_id_cdc37d10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/Views/Start.vue?");

/***/ }),

/***/ "./src/components/Login.vue":
/*!**********************************!*\
  !*** ./src/components/Login.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=ef68022e&scoped=true& */ \"./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&\");\n/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ \"./src/components/Login.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& */ \"./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VForm */ \"./node_modules/vuetify/lib/components/VForm/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"ef68022e\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VFlex: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VFlex\"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_7__[\"VForm\"],VLayout: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VLayout\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__[\"VTextField\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('ef68022e')) {\n      api.createRecord('ef68022e', component.options)\n    } else {\n      api.reload('ef68022e', component.options)\n    }\n    module.hot.accept(/*! ./Login.vue?vue&type=template&id=ef68022e&scoped=true& */ \"./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=ef68022e&scoped=true& */ \"./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&\");\n(function () {\n      api.rerender('ef68022e', {\n        render: _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/components/Login.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/Login.vue?");

/***/ }),

/***/ "./src/components/Login.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/components/Login.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/Login.vue?");

/***/ }),

/***/ "./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&":
/*!*******************************************************************************************!*\
  !*** ./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=style&index=0&id=ef68022e&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_ef68022e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/Login.vue?");

/***/ }),

/***/ "./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&":
/*!*****************************************************************************!*\
  !*** ./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=ef68022e&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"aa2a2d38-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Login.vue?vue&type=template&id=ef68022e&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_ef68022e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Login.vue?");

/***/ }),

/***/ "./src/components/RegisterUserForm.vue":
/*!*********************************************!*\
  !*** ./src/components/RegisterUserForm.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& */ \"./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&\");\n/* harmony import */ var _RegisterUserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisterUserForm.vue?vue&type=script&lang=js& */ \"./src/components/RegisterUserForm.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& */ \"./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VCheckbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCheckbox */ \"./node_modules/vuetify/lib/components/VCheckbox/index.js\");\n/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ \"./node_modules/vuetify/lib/components/VDialog/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VForm */ \"./node_modules/vuetify/lib/components/VForm/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _RegisterUserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"9f29e3bc\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCard\"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardActions\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardText\"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardTitle\"],VCheckbox: vuetify_lib_components_VCheckbox__WEBPACK_IMPORTED_MODULE_7__[\"VCheckbox\"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_8__[\"VDialog\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_9__[\"VDivider\"],VFlex: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__[\"VFlex\"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_11__[\"VForm\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_12__[\"VIcon\"],VLayout: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__[\"VLayout\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__[\"VSpacer\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__[\"VTextField\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('9f29e3bc')) {\n      api.createRecord('9f29e3bc', component.options)\n    } else {\n      api.reload('9f29e3bc', component.options)\n    }\n    module.hot.accept(/*! ./RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& */ \"./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& */ \"./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&\");\n(function () {\n      api.rerender('9f29e3bc', {\n        render: _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/components/RegisterUserForm.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?");

/***/ }),

/***/ "./src/components/RegisterUserForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./src/components/RegisterUserForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?");

/***/ }),

/***/ "./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&":
/*!******************************************************************************************************!*\
  !*** ./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=style&index=0&id=9f29e3bc&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_style_index_0_id_9f29e3bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?");

/***/ }),

/***/ "./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"aa2a2d38-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/RegisterUserForm.vue?vue&type=template&id=9f29e3bc&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisterUserForm_vue_vue_type_template_id_9f29e3bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/RegisterUserForm.vue?");

/***/ }),

/***/ "./src/components/Todos.vue":
/*!**********************************!*\
  !*** ./src/components/Todos.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todos.vue?vue&type=template&id=d37f6326&scoped=true& */ \"./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&\");\n/* harmony import */ var _Todos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todos.vue?vue&type=script&lang=js& */ \"./src/components/Todos.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& */ \"./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VChip */ \"./node_modules/vuetify/lib/components/VChip/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Todos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"d37f6326\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCard\"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardActions\"],VCardSubtitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardSubtitle\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardText\"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__[\"VCardTitle\"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_7__[\"VChip\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VContainer\"],VFlex: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VFlex\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__[\"VImg\"],VLayout: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VLayout\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VRow\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__[\"VSpacer\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('d37f6326')) {\n      api.createRecord('d37f6326', component.options)\n    } else {\n      api.reload('d37f6326', component.options)\n    }\n    module.hot.accept(/*! ./Todos.vue?vue&type=template&id=d37f6326&scoped=true& */ \"./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todos.vue?vue&type=template&id=d37f6326&scoped=true& */ \"./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&\");\n(function () {\n      api.rerender('d37f6326', {\n        render: _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/components/Todos.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/Todos.vue?");

/***/ }),

/***/ "./src/components/Todos.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/components/Todos.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/Todos.vue?");

/***/ }),

/***/ "./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&":
/*!*******************************************************************************************!*\
  !*** ./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=style&index=0&id=d37f6326&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_style_index_0_id_d37f6326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/Todos.vue?");

/***/ }),

/***/ "./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&":
/*!*****************************************************************************!*\
  !*** ./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa2a2d38-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vuetify-loader/lib/loader.js??ref--18-0!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Todos.vue?vue&type=template&id=d37f6326&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"aa2a2d38-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Todos.vue?vue&type=template&id=d37f6326&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_aa2a2d38_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_18_0_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Todos_vue_vue_type_template_id_d37f6326_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Todos.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.promise.js */ \"./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/@vue/babel-preset-app/node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_alexa_source_repos_vueproject_node_modules_vue_babel_preset_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/App.vue */ \"./src/App.vue\");\n/* harmony import */ var _plugins_default_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins/default.router */ \"./src/plugins/default.router.js\");\n/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugins/vuetify */ \"./src/plugins/vuetify.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _plugins_default_router__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/default.router.js":
/*!***************************************!*\
  !*** ./src/plugins/default.router.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/index */ \"./src/store/index.js\");\n/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/Login */ \"./src/components/Login.vue\");\n/* harmony import */ var _Views_Start__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Views/Start */ \"./src/Views/Start.vue\");\n/* harmony import */ var _components_RegisterUserForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/RegisterUserForm */ \"./src/components/RegisterUserForm.vue\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  mode: 'history',\n  base: \"/\",\n  routes: [//{\n  //    path: '/',\n  //    name: 'start',\n  //    component: () => import('@/Views/Start.vue')\n  //},\n  {\n    path: '/',\n    name: 'start',\n    component: _Views_Start__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n    beforeEnter: function beforeEnter(to, from, next) {\n      var hasPermission;\n      return regeneratorRuntime.async(function beforeEnter$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return regeneratorRuntime.awrap(_store_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].dispatch('login/USER_IS_LOGGED_IN'));\n\n            case 2:\n              hasPermission = _context.sent;\n\n              if (hasPermission) {\n                next();\n              }\n\n              if (!hasPermission) {\n                //TODO: Might send user to the configurator instead of login\n                next({\n                  name: \"login\",\n                  // back to safety route //\n                  query: {\n                    redirectFrom: to.fullPath\n                  }\n                });\n              }\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      });\n    }\n  }, {\n    path: '/register',\n    name: 'register',\n    component: _components_RegisterUserForm__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n  }, {\n    path: '/login',\n    name: 'login',\n    component: _components_Login__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  } //{\n  //    path: '/details/:id',\n  //    name: 'details',\n  //    // route level code-splitting\n  //    // this generates a separate chunk (about.[hash].js) for this route\n  //    // which is lazy-loaded when the route is visited.\n  //    component: () => import(/* webpackChunkName: \"about\" */ './views/ArticleDetails.vue')\n  //}\n  ]\n}); //router.beforeEach((to, from, next) => {\n//    store.dispatch(\"login/GET_USERDATA\");\n//    next()\n//});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/plugins/default.router.js?");

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib */ \"./node_modules/vuetify/lib/index.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({}));\n\n//# sourceURL=webpack:///./src/plugins/vuetify.js?");

/***/ }),

/***/ "./src/services/account.js":
/*!*********************************!*\
  !*** ./src/services/account.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  register: function register(vm) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/account/register', vm);\n  },\n  changePassword: function changePassword(vm) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/account/ChangePassword', vm);\n  },\n  login: function login(vm) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/account/login', vm);\n  },\n  isUserLoggedIn: function isUserLoggedIn() {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/account/isuserloggedin', {\n      withCredentials: true\n    });\n  },\n  logout: function logout() {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/account/logout', {\n      withCredentials: true\n    });\n  },\n  getUser: function getUser() {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/account/GetLoggedUser', {\n      withCredentials: true\n    });\n  },\n  updateUser: function updateUser(vm) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/account/updateUser', vm);\n  },\n  impersonate: function impersonate(id) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"api/account/impersonateUser/\".concat(id), {\n      withCredentials: true\n    });\n  },\n  stopImpersonation: function stopImpersonation() {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('api/account/StopImpersonation', {\n      withCredentials: true\n    });\n  },\n  getAllCustomerUsers: function getAllCustomerUsers() {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('api/account/GetAllCustomerUsers', {\n      withCredentials: true\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/services/account.js?");

/***/ }),

/***/ "./src/services/generic.js":
/*!*********************************!*\
  !*** ./src/services/generic.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  /* eslint-disable no-console */\n  getAll: function getAll(apiAdress) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"/api/\".concat(apiAdress)).then(function (result) {\n      console.log(result.data);\n      return result.data;\n    }).catch(function (result) {\n      console.log(result);\n    });\n  },\n  get: function get(apiAdress, id) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"/api/\".concat(apiAdress, \"/\").concat(id)).then(function (result) {\n      console.log(result.data);\n      return result.data;\n    }).catch(function (result) {\n      console.log(result);\n    });\n  },\n  add: function add(apiAdress, vm) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"/api/\".concat(apiAdress, \"/\"), vm).then(function (result) {\n      console.log(result.status);\n      return result;\n    }).catch(function (result) {\n      console.log(result);\n    }, function (error) {\n      console.log(error);\n    });\n  },\n  update: function update(apiAdress, entity) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"/api/\".concat(apiAdress, \"/\").concat(entity.id), entity).then(function (result) {\n      console.log(result.status);\n      return result;\n    }).catch(function (result) {\n      console.log(result);\n    });\n  },\n  //update: (apiAdress, entity) => {\n  //    return axios.post(`/api/${apiAdress}/${entity.id}`, entity)\n  //        .then(result => {\n  //            console.log(result.status);\n  //            return result;\n  //        }).catch(result => { console.log(result); });\n  //},\n  delete: function _delete(apiAdress, id) {\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(\"/api/\".concat(apiAdress, \"/\").concat(id)).then(function (result) {\n      console.log(result.status);\n      return result.status;\n    }).catch(function (result) {\n      console.log(result);\n    });\n    /* eslint-enable no-console */\n  }\n});\n\n//# sourceURL=webpack:///./src/services/generic.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _modules_login_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/login/actions */ \"./src/store/modules/login/actions.js\");\n/* harmony import */ var _modules_login_mutations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/login//mutations */ \"./src/store/modules/login/mutations.js\");\n/* harmony import */ var _modules_login_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/login/index */ \"./src/store/modules/login/index.js\");\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  //strict: true,\n  modules: {\n    login: _modules_login_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  },\n  state: {\n    title: 'Kundvagn',\n    cart: []\n  },\n  //  mutations: {\n  //      SET_NEW_CART_ITEM(state, product) {\n  //          state.cart.push({\n  //              id: product.id,\n  //              name: product.name,\n  //              published: product.published\n  //          })\n  //          //state.extend({},  )\n  //      },\n  //      REMOVE_CART_ITEM(state, productId) {\n  //          state.cart.pop(productId, 1)\n  //      }\n  //},\n  //  actions: {\n  //      ADD_TO_CART({ commit, product }) {\n  //          commit('SET_NEW_CART_ITEM', product);\n  //      },\n  //      REMOVE_PRODUCT_FROM_BASKET({ commit, productId }) {\n  //          commit('REMOVE_CART_ITEM', productId)\n  //          //splice(index, 1) remove object from cart with id\n  //      },\n  //},\n  //modules: {\n  //}\n  mutations: _modules_login_mutations__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  actions: _modules_login_actions__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n\nif (true) {\n  // accept actions and mutations as hot modules\n  //module.hot.accept(['./modules/windows/index',\n  //                    './modules/door/index',\n  //                    './modules/doorleaves/index',\n  //                    './modules/maindoor/index',\n  //                    './modules/login/index',\n  //                    './modules/deliveryAddress/index'],\n  module.hot.accept([/*! ./modules/login/index */ \"./src/store/modules/login/index.js\"], function() { /* harmony import */ _modules_login_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/login/index */ \"./src/store/modules/login/index.js\");\n });\n\n  (function () {\n    // require the updated modules\n    // have to add .default here due to babel 6 module output\n    //const newModuleWindows = require('./modules/windows/index').default\n    //const newModuleDoor = require('./modules/door/index').default\n    //const newModuleDoorLeaves = require('./modules/doorleaves/index').default\n    //const newModuleMainDoor = require('./modules/maindoor/index').default\n    //const newModuleLogin = require('./modules/login/index').default\n    //const newModuleDeliveryAddress = require('./modules/deliveryAddress/index').default\n    var newModuleLogin = __webpack_require__(/*! ./modules/login/index */ \"./src/store/modules/login/index.js\").default; // swap in the new modules and mutations\n\n\n    store.hotUpdate({\n      modules: {\n        //windows: newModuleWindows,\n        //door: newModuleDoor,\n        //doorLeaves: newModuleDoorLeaves,\n        //mainDoor: newModuleMainDoor,\n        login: newModuleLogin\n      }\n    });\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/modules/login/actions.js":
/*!********************************************!*\
  !*** ./src/store/modules/login/actions.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_account_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/account.js */ \"./src/services/account.js\");\n/* harmony import */ var _plugins_default_router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/plugins/default.router.js */ \"./src/plugins/default.router.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  LOGIN: function LOGIN(_ref, data) {\n    var commit = _ref.commit;\n\n    /*eslint no-debugger: */\n    //commit('SET_LOADING', true, { root: true });\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login(data.vm).then(function () {\n      //commit('SET_LOADING', false, { root: true });\n      commit('SET_AS_LOGGED_IN', true); //if (data.redirectUrl != '') {\n      //    router.push(data.redirectUrl);\n      //} else {\n      //    router.push('/');\n      //}\n    }).catch(function (result) {\n      //commit('SET_ERRORS', result);\n      console.log(result); //commit('SET_LOADING', false, { root: true });\n\n      commit('SET_AS_LOGGED_IN', false);\n    });\n  },\n  USER_IS_LOGGED_IN: function USER_IS_LOGGED_IN() {\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isUserLoggedIn().then(function (result) {\n      /*eslint no-console: 1*/\n      // custom console\n      console.log(result);\n      return true;\n    }).catch(function (result) {\n      console.log(result);\n      return false;\n    });\n  },\n  GET_INLOGGED_USER: function GET_INLOGGED_USER(_ref2) {\n    var commit = _ref2.commit;\n    commit('SET_LOADING', true, {\n      root: true\n    });\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUser().then(function (result) {\n      console.log(result.status);\n      commit('SET_CUSTOMER', result.data);\n      if (result.data) commit('SET_AS_LOGGED_IN', true);\n      commit('SET_LOADING', false, {\n        root: true\n      });\n    }).catch(function (result) {\n      console.log(result);\n      commit('SET_ERRORS', result.response.data);\n      console.log(result.response.data); //commit('SET_LOADING', false, { root: true });\n    });\n  },\n  CHANGE_PASSWORD: function CHANGE_PASSWORD(vm) {\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].changePassword(vm).then(function (result) {\n      console.log(result);\n      return true;\n    }).catch(function () {\n      return false;\n    });\n  },\n  REGISTER_NEW_USER: function REGISTER_NEW_USER(_ref3, data) {\n    var commit = _ref3.commit;\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register(data.vm).then(function () {\n      commit('SET_AS_LOGGED_IN', true);\n\n      if (data.redirectUrl != '') {\n        _plugins_default_router_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push(data.redirectUrl);\n      } else {\n        _plugins_default_router_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].push('/');\n      }\n    }).catch(function () {\n      commit('SET_AS_LOGGED_IN', false);\n    });\n  },\n  UPDATE_USER: function UPDATE_USER(_ref4, vm) {\n    var commit = _ref4.commit;\n    commit('SET_LOADING', true, {\n      root: true\n    });\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateUser(vm).then(function (result) {\n      console.log(result.status);\n      commit('SET_CUSTOMER', result.data);\n      commit('SET_LOADING', false, {\n        root: true\n      });\n    }).catch(function (result) {\n      console.log(result);\n      commit('SET_ERRORS', result.response.data);\n      commit('SET_LOADING', false, {\n        root: true\n      });\n    });\n  },\n  LOGOUT: function LOGOUT(_ref5) {\n    var commit = _ref5.commit;\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].logout().then(function () {\n      commit('SET_AS_LOGGED_IN', false);\n    }).catch(function () {\n      commit('SET_AS_LOGGED_IN', true);\n    });\n  },\n  GET_USERDATA: function GET_USERDATA(_ref6) {\n    var commit = _ref6.commit;\n    return _services_account_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUser().then(function (result) {\n      commit('SET_USERDATA', result.data);\n    }).catch(function () {\n      commit('SET_ALERT', {\n        status: true,\n        message: \"Något gick snett.*\",\n        type: \"error\",\n        timeout: 3000\n      }, {\n        root: true\n      });\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/store/modules/login/actions.js?");

/***/ }),

/***/ "./src/store/modules/login/index.js":
/*!******************************************!*\
  !*** ./src/store/modules/login/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/store/modules/login/actions.js\");\n/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutations */ \"./src/store/modules/login/mutations.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namespaced: true,\n  state: {\n    loginViewModel: {\n      password: '',\n      username: '',\n      rememberMe: false\n    },\n    userData: {},\n    redirectUrl: '',\n    customerViewModel: {},\n    errors: {},\n    isUserLoggedIn: false,\n    users: [],\n    selectedUser: ''\n  },\n  actions: _actions__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  mutations: _mutations__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack:///./src/store/modules/login/index.js?");

/***/ }),

/***/ "./src/store/modules/login/mutations.js":
/*!**********************************************!*\
  !*** ./src/store/modules/login/mutations.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  SET_PASSWORD: function SET_PASSWORD(state, password) {\n    state.loginViewModel.password = password;\n  },\n  SET_USERNAME: function SET_USERNAME(state, username) {\n    state.loginViewModel.username = username;\n  },\n  //SET_REMEMBER_ME(state, rememberMe) {\n  //    //TODO auto set is false, set to \"rememberMe\" when function implemented\n  //    state.loginViewModel.rememberMe = false;\n  //},\n  SET_ERRORS: function SET_ERRORS(state, errors) {\n    state.errors = errors;\n  },\n  SET_CUSTOMER: function SET_CUSTOMER(state, customer) {\n    state.customerViewModel = customer;\n  },\n  UPDATE_USER: function UPDATE_USER(state, customer) {\n    state.customerViewModel = customer;\n  },\n  SET_FIRSTNAME: function SET_FIRSTNAME(state, firstName) {\n    state.customerViewModel.firstName = firstName;\n  },\n  SET_LASTNAME: function SET_LASTNAME(state, lastName) {\n    state.customerViewModel.lastName = lastName;\n  },\n  SET_PHONENUMBER: function SET_PHONENUMBER(state, phoneNumber) {\n    state.customerViewModel.phoneNumber = phoneNumber;\n  },\n  SET_COMPANYNAME: function SET_COMPANYNAME(state, companyName) {\n    state.customerViewModel.companyName = companyName;\n  },\n  SET_DELIVERYADDRESS: function SET_DELIVERYADDRESS(state, deliveryAddress) {\n    state.customerViewModel.SelectedDeliveryAddressId = deliveryAddress;\n  },\n  SET_INVOICEADDRESS: function SET_INVOICEADDRESS(state, invoiceaddress) {\n    state.customerViewModel.SelectedInvoiceAddressId = invoiceaddress;\n  },\n  SET_AS_LOGGED_IN: function SET_AS_LOGGED_IN(state, payload) {\n    /*eslint no-debugger: */\n    //debugger;\n    state.isUserLoggedIn = payload;\n  },\n  SET_USERDATA: function SET_USERDATA(state, userData) {\n    state.userData = userData;\n  },\n  SET_REDIRECT_URL: function SET_REDIRECT_URL(state, url) {\n    state.redirectUrl = url;\n  },\n  SET_SELECTED_DELIVERYADDRESS: function SET_SELECTED_DELIVERYADDRESS(state, deliveryAddress) {\n    state.customerViewModel.selectedDeliveryAddress = deliveryAddress;\n  },\n  ADD_TO_USERS: function ADD_TO_USERS(state, user) {\n    state.users.push({\n      value: user.id,\n      text: user.userName\n    });\n  },\n  SET_SELECTED_USER: function SET_SELECTED_USER(state, user) {\n    state.selectedUser = user;\n  }\n});\n\n//# sourceURL=webpack:///./src/store/modules/login/mutations.js?");

/***/ }),

/***/ 0:
/*!***************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true ./src/main.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true */\"./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true\");\nmodule.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_webpack-hot-middleware/client?");

/***/ })

/******/ });