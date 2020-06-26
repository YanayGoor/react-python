var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="cytoolz.data";var REMOTE_PACKAGE_BASE="cytoolz.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","cytoolz-0.10.0-py3.7.egg-info",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","cytoolz",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/cytoolz","curried",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/cytoolz","tests",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:650524,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1046,2409,3503,4424,5781,7064,8173,9042,10042,10956,11786,12395,13129,13609,14062,14693,15370,16059,16941,17848,18211,18493,19240,19763,20787,21400,22047,22704,23284,24241,25042,26265,27498,28895,29483,30219,31369,32781,34051,35262,36169,37147,38075,38800,39488,39991,40518,41294,42189,42818,43081,43305,44111,44672,45625,46877,47585,48048,49053,49716,50289,51369,52291,53072,54276,55688,57021,57976,59318,60352,61408,62410,63747,64871,65829,66803,68070,69359,70336,71673,72822,73797,74529,75637,76984,78226,79544,80714,81905,83087,83807,84356,84895,85426,86036,86664,87258,87870,88475,89311,89945,90436,90941,91452,92071,92654,93248,93829,94401,95546,96612,97364,97937,98578,99291,100004,100619,101249,101905,102539,103165,103754,104561,105062,105626,106150,106735,107390,107887,108372,108880,109353,109812,110277,110759,111239,111735,112232,112781,113288,113768,114250,114721,115224,115969,116442,116922,117391,117866,118349,118824,119294,119760,120482,121199,121917,122418,123253,123922,125504,126732,127773,128773,129708,130669,131553,132269,133079,133773,134365,134956,135746,136745,137665,138128,138402,139102,139629,140406,141127,141872,142505,143182,143848,144553,145374,145997,146717,147338,148037,148612,149304,149907,150481,151114,151703,152551,153291,154174,154933,155694,156435,157088,157731,158521,159053,159945,160870,161609,162375,162984,164072,164696,165407,166328,167143,167706,168443,169298,170170,170943,171722,172459,173105,173698,174643,175377,176194,176879,177675,178415,179036,179797,180536,181168,181842,182572,183134,183896,184464,185290,185864,186765,187902,188856,189500,190243,190898,191395,192078,192830,193515,194008,194722,195402,196056,196749,197279,197925,198659,199376,200101,200817,201354,201901,202858,203902,204165,204858,205452,206078,207066,207843,208528,209232,209929,210397,211338,211775,212022,212680,213431,214007,214789,215233,215722,216650,217289,217910,218783,219385,219940,220459,220938,221637,222513,222978,223817,224495,225612,226181,226571,227203,228084,228782,229780,230466,231143,231755,232515,233457,234207,235172,235727,236804,237459,238145,239102,239740,240579,241458,242307,243164,244046,244964,245852,246720,247196,247555,247816,248135,249396,249993,250638,251383,252091,252785,253527,254159,254982,255502,256181,256866,257579,258247,259051,259522,260125,260512,260887,261275,261778,262365,263128,264225,264961,265589,266316,267324,268056,268667,269437,270005,271085,271781,272384,273492,274695,275568,276515,277819,278573,279480,280834,282154,283366,284136,285199,286430,287059,287752,288844,290051,291218,292381,293782,294870,295857,296851,297842,298829,299814,300810,301948,303122,304275,305415,306553,307717,308844,309462,310089,310766,311364,311847,312382,313604,314918,316129,317472,318601,319559,320319,321327,321783,322175,322571,323600,324620,325987,327221,328552,329883,330623,330777,330869,330941,331003,331985,333122,334148,335238,336132,336879,337432,337806,338885,340252,341475,342661,343444,344518,345638,346693,347682,348827,350059,351351,352472,353620,354869,355711,356933,358121,358941,359716,360608,361445,362303,363372,364502,365677,367019,368238,369517,370551,371195,371907,372526,373256,373972,374602,375276,375767,376705,377919,378636,379576,380518,381337,382130,383097,383673,384241,384806,385199,385708,386096,386777,387426,388144,388667,389210,389703,390203,390899,391627,392396,393214,394121,395115,395356,395530,396362,396944,397481,397818,398415,399264,400060,400866,401845,402518,403410,404238,404952,405677,406283,406870,407501,408255,409155,409918,410529,411206,411812,412218,412766,413524,414157,414937,415551,415950,416353,416578,417220,417836,418457,419342,419754,420320,420896,421727,422591,423214,424111,424953,425657,426429,427257,427976,428657,429306,430106,430792,431619,432385,432991,434120,434795,435546,436110,436876,437892,438432,438974,439768,440532,441035,441373,442244,442881,443689,444106,445193,445976,446726,447241,447741,448280,448956,449493,450282,450759,451382,452148,452941,453725,454392,455050,455988,456738,457317,458269,458842,459318,460142,460769,461293,462109,462888,463497,464209,465230,465982,466660,467608,468245,468962,469946,470523,471156,472148,472977,473594,474120,474986,475600,476165,476860,477634,478346,478969,479403,479730,479936,480735,481510,482836,483589,484213,484823,485498,486199,487036,487992,488810,490027,490881,491423,492478,493754,495106,496095,497074,498062,499051,500095,501291,502451,503006,503681,504216,504695,505824,506979,508351,509627,510351,511530,512664,513777,513958,514901,516409,517643,518656,519670,520850,521699,522478,523395,524249,525040,526141,527449,528641,529810,530659,531362,532214,533276,534216,534942,535804,536497,537205,537790,538309,538827,539332,540080,540952,541832,542433,542702,543236,543941,544597,545190,545950,546804,547540,548307,549114,549719,550440,551134,551787,552576,553108,553628,554332,554995,555806,556371,557137,557719,558471,559237,560081,560793,561545,562118,562944,563659,564410,565117,565843,566725,567363,567918,568489,569282,570042,570475,571174,572172,573226,573748,574542,575711,576346,577018,577776,578365,579234,579963,580811,581658,582923,584203,585113,586498,587853,589065,590055,590878,591428,592039,593069,594153,595458,596515,597525,598744,599726,600583,601544,602772,603850,604903,605744,606574,607568,608593,609589,610515,611284,612262,613208,613703,614210,614982,615716,616389,617346,618476,619450,620553,621653,622815,623960,624907,626061,627e3,628049,628776,629838,630813,631950,633021,634124,635101,635947,636893,638080,639284,639921,640803,641920,642999,643571,644885,646053,646802,647593,648253,648851,649712],sizes:[1046,1363,1094,921,1357,1283,1109,869,1e3,914,830,609,734,480,453,631,677,689,882,907,363,282,747,523,1024,613,647,657,580,957,801,1223,1233,1397,588,736,1150,1412,1270,1211,907,978,928,725,688,503,527,776,895,629,263,224,806,561,953,1252,708,463,1005,663,573,1080,922,781,1204,1412,1333,955,1342,1034,1056,1002,1337,1124,958,974,1267,1289,977,1337,1149,975,732,1108,1347,1242,1318,1170,1191,1182,720,549,539,531,610,628,594,612,605,836,634,491,505,511,619,583,594,581,572,1145,1066,752,573,641,713,713,615,630,656,634,626,589,807,501,564,524,585,655,497,485,508,473,459,465,482,480,496,497,549,507,480,482,471,503,745,473,480,469,475,483,475,470,466,722,717,718,501,835,669,1582,1228,1041,1e3,935,961,884,716,810,694,592,591,790,999,920,463,274,700,527,777,721,745,633,677,666,705,821,623,720,621,699,575,692,603,574,633,589,848,740,883,759,761,741,653,643,790,532,892,925,739,766,609,1088,624,711,921,815,563,737,855,872,773,779,737,646,593,945,734,817,685,796,740,621,761,739,632,674,730,562,762,568,826,574,901,1137,954,644,743,655,497,683,752,685,493,714,680,654,693,530,646,734,717,725,716,537,547,957,1044,263,693,594,626,988,777,685,704,697,468,941,437,247,658,751,576,782,444,489,928,639,621,873,602,555,519,479,699,876,465,839,678,1117,569,390,632,881,698,998,686,677,612,760,942,750,965,555,1077,655,686,957,638,839,879,849,857,882,918,888,868,476,359,261,319,1261,597,645,745,708,694,742,632,823,520,679,685,713,668,804,471,603,387,375,388,503,587,763,1097,736,628,727,1008,732,611,770,568,1080,696,603,1108,1203,873,947,1304,754,907,1354,1320,1212,770,1063,1231,629,693,1092,1207,1167,1163,1401,1088,987,994,991,987,985,996,1138,1174,1153,1140,1138,1164,1127,618,627,677,598,483,535,1222,1314,1211,1343,1129,958,760,1008,456,392,396,1029,1020,1367,1234,1331,1331,740,154,92,72,62,982,1137,1026,1090,894,747,553,374,1079,1367,1223,1186,783,1074,1120,1055,989,1145,1232,1292,1121,1148,1249,842,1222,1188,820,775,892,837,858,1069,1130,1175,1342,1219,1279,1034,644,712,619,730,716,630,674,491,938,1214,717,940,942,819,793,967,576,568,565,393,509,388,681,649,718,523,543,493,500,696,728,769,818,907,994,241,174,832,582,537,337,597,849,796,806,979,673,892,828,714,725,606,587,631,754,900,763,611,677,606,406,548,758,633,780,614,399,403,225,642,616,621,885,412,566,576,831,864,623,897,842,704,772,828,719,681,649,800,686,827,766,606,1129,675,751,564,766,1016,540,542,794,764,503,338,871,637,808,417,1087,783,750,515,500,539,676,537,789,477,623,766,793,784,667,658,938,750,579,952,573,476,824,627,524,816,779,609,712,1021,752,678,948,637,717,984,577,633,992,829,617,526,866,614,565,695,774,712,623,434,327,206,799,775,1326,753,624,610,675,701,837,956,818,1217,854,542,1055,1276,1352,989,979,988,989,1044,1196,1160,555,675,535,479,1129,1155,1372,1276,724,1179,1134,1113,181,943,1508,1234,1013,1014,1180,849,779,917,854,791,1101,1308,1192,1169,849,703,852,1062,940,726,862,693,708,585,519,518,505,748,872,880,601,269,534,705,656,593,760,854,736,767,807,605,721,694,653,789,532,520,704,663,811,565,766,582,752,766,844,712,752,573,826,715,751,707,726,882,638,555,571,793,760,433,699,998,1054,522,794,1169,635,672,758,589,869,729,848,847,1265,1280,910,1385,1355,1212,990,823,550,611,1030,1084,1305,1057,1010,1219,982,857,961,1228,1078,1053,841,830,994,1025,996,926,769,978,946,495,507,772,734,673,957,1130,974,1103,1100,1162,1145,947,1154,939,1049,727,1062,975,1137,1071,1103,977,846,946,1187,1204,637,882,1117,1079,572,1314,1168,749,791,660,598,861,812],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_cytoolz.data")}Module["addRunDependency"]("datafile_cytoolz.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/SOURCES.txt",start:0,end:1365,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/top_level.txt",start:1365,end:1373,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/PKG-INFO",start:1373,end:6269,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/requires.txt",start:6269,end:6282,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/dependency_links.txt",start:6282,end:6283,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz-0.10.0-py3.7.egg-info/not-zip-safe",start:6283,end:6284,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/cpython.pxd",start:6284,end:6781,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/recipes.pxd",start:6781,end:6881,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/dicttoolz.pxd",start:6881,end:8249,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/recipes.pyx",start:8249,end:9887,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/recipes.so",start:9887,end:78789,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/utils.so",start:78789,end:133876,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/utils_test.py",start:133876,end:135951,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/functoolz.pyx",start:135951,end:161117,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/dicttoolz.pyx",start:161117,end:176624,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/itertoolz.so",start:176624,end:895474,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/itertoolz.pyx",start:895474,end:946687,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/utils.pxd",start:946687,end:946720,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/functoolz.so",start:946720,end:1369788,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/_version.py",start:1369788,end:1369840,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/functoolz.pxd",start:1369840,end:1371092,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/itertoolz.pxd",start:1371092,end:1375787,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/__init__.pxd",start:1375787,end:1376537,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/_signatures.py",start:1376537,end:1380893,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/compatibility.py",start:1380893,end:1381967,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/utils.pyx",start:1381967,end:1383320,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/dicttoolz.so",start:1383320,end:1575538,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/__init__.py",start:1575538,end:1576023,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/curried/exceptions.py",start:1576023,end:1576373,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/curried/operator.py",start:1576373,end:1576875,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/curried/__init__.py",start:1576875,end:1579759,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_itertoolz.py",start:1579759,end:1597972,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_inspect_args.py",start:1597972,end:1614224,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_tlz.py",start:1614224,end:1615710,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_curried.py",start:1615710,end:1619413,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_docstrings.py",start:1619413,end:1622447,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_dev_skip_test.py",start:1622447,end:1622827,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_functoolz.py",start:1622827,end:1643178,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_utils.py",start:1643178,end:1643563,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_recipes.py",start:1643563,end:1644385,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_serialization.py",start:1644385,end:1650279,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_embedded_sigs.py",start:1650279,end:1653774,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_dicttoolz.py",start:1653774,end:1662719,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_signatures.py",start:1662719,end:1665652,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/dev_skip_test.py",start:1665652,end:1666655,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_none_safe.py",start:1666655,end:1678877,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_curried_toolzlike.py",start:1678877,end:1680276,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_compatibility.py",start:1680276,end:1680823,audio:0},{filename:"/lib/python3.7/site-packages/cytoolz/tests/test_doctests.py",start:1680823,end:1681258,audio:0}],remote_package_size:654620,package_uuid:"0f17449a-c0c9-4f78-a3de-42f67df3d845"})})();