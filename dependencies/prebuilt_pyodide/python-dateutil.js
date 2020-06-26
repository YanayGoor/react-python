var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="python-dateutil.data";var REMOTE_PACKAGE_BASE="python-dateutil.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","dateutil",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","tz",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","parser",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","zoneinfo",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","python_dateutil-2.8.1-py3.7.egg-info",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:304948,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1331,2849,4246,5573,6503,7547,8318,9321,9905,10894,11618,12207,13036,14039,15367,16455,17516,18555,19761,21108,22173,23334,24548,25324,26248,26966,27872,28906,29926,30900,31650,32472,33289,34559,35917,36876,37725,38716,39781,40636,41758,42788,43825,44977,45944,46712,47791,49206,50434,51655,52730,53721,54796,56144,57413,58424,59616,60623,61733,62934,64059,65259,66404,67377,68694,69908,71016,72230,73382,74387,75141,76010,77216,78241,78987,80007,81211,82570,83951,85170,86400,87680,89032,90120,91353,92689,93848,94998,96331,97623,98923,99932,101320,102641,103863,104965,105931,107144,108329,109926,111208,111994,112925,114132,115065,116176,117266,118195,119275,120494,121659,122810,123753,124600,125734,126729,127661,128859,130164,131295,132478,133792,134958,136173,136956,137882,138453,139718,141329,143377,145425,147473,149521,151576,153624,155672,157720,159775,161832,163885,165923,167976,170029,172078,174126,176183,178237,180285,182333,184388,186410,188458,190511,192568,194624,196672,198720,200768,202816,204864,206912,208969,211017,213065,215113,217161,219209,221262,223310,225317,227365,229413,231470,233518,235566,237614,239662,241710,243758,245806,247854,249902,251950,253998,256045,258093,260141,262189,264237,266285,268332,270388,272436,274484,276532,278580,280628,282676,284724,286772,288820,290868,292916,294499,295882,297196,298359,299463,300453,301624,302907,304287],sizes:[1331,1518,1397,1327,930,1044,771,1003,584,989,724,589,829,1003,1328,1088,1061,1039,1206,1347,1065,1161,1214,776,924,718,906,1034,1020,974,750,822,817,1270,1358,959,849,991,1065,855,1122,1030,1037,1152,967,768,1079,1415,1228,1221,1075,991,1075,1348,1269,1011,1192,1007,1110,1201,1125,1200,1145,973,1317,1214,1108,1214,1152,1005,754,869,1206,1025,746,1020,1204,1359,1381,1219,1230,1280,1352,1088,1233,1336,1159,1150,1333,1292,1300,1009,1388,1321,1222,1102,966,1213,1185,1597,1282,786,931,1207,933,1111,1090,929,1080,1219,1165,1151,943,847,1134,995,932,1198,1305,1131,1183,1314,1166,1215,783,926,571,1265,1611,2048,2048,2048,2048,2055,2048,2048,2048,2055,2057,2053,2038,2053,2053,2049,2048,2057,2054,2048,2048,2055,2022,2048,2053,2057,2056,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2053,2048,2007,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2047,2048,2048,2048,2048,2048,2047,2056,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,1583,1383,1314,1163,1104,990,1171,1283,1380,661],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_python-dateutil.data")}Module["addRunDependency"]("datafile_python-dateutil.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/dateutil/_common.py",start:0,end:932,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/easter.py",start:932,end:3616,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/relativedelta.py",start:3616,end:28520,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/rrule.py",start:28520,end:95259,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/utils.py",start:95259,end:97218,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tzwin.py",start:97218,end:97277,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/_version.py",start:97277,end:97393,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/__init__.py",start:97393,end:97615,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/tz.py",start:97615,end:160547,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/_common.py",start:160547,end:173524,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/win.py",start:173524,end:186459,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/_factories.py",start:186459,end:189028,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/__init__.py",start:189028,end:189472,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/isoparser.py",start:189472,end:202570,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/_parser.py",start:202570,end:261374,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/__init__.py",start:261374,end:263140,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/dateutil-zoneinfo.tar.gz",start:263140,end:416455,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/rebuild.py",start:416455,end:418174,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/__init__.py",start:418174,end:424063,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/SOURCES.txt",start:424063,end:426131,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/top_level.txt",start:426131,end:426140,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/PKG-INFO",start:426140,end:435459,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/requires.txt",start:435459,end:435468,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/zip-safe",start:435468,end:435469,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/dependency_links.txt",start:435469,end:435470,audio:0}],remote_package_size:309044,package_uuid:"7272a9a1-2bf5-4a3b-8a0d-46d416d801cd"})})();