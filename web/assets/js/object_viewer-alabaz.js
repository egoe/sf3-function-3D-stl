$(document).ready(function(){

    var def = defintionDefaut;
    var NbPartie=0;

    var ConvertUnit = [ [1,0.1,0.01,25.4], [10,1,0.1,2.54],[100,10,1,0.254],[0.0393701,0.393701,3.93701,1]] ;

    $("#unitVolume").text(unit + "3") ;
    
    var RealX ;
    var RealY ;
    var RealZ ;
    
    var DimX = document.getElementById('DimX')  ;
    var DimY = document.getElementById('DimY')  ;
    var DimZ = document.getElementById('DimZ')  ;
    var iColorModel = document.getElementById('colorObject')    ;
    var iColorBG1= document.getElementById('colorBG1')  ;
    var iColorBG2 = document.getElementById('colorBG2') ;
    
    var coefDim = 1;   // Coef sur la dimension pour adapter le modèle a la taille demandée
    var totalVolume = 0;
    var colorModel = "#760039";         // Valeur par défaut de la coleur du modele
    var colorBG1 = "#CFCFCF";           // Valeur par défaut de la coleur du modele
    var colorBG2 = "#111111";

    var StlFichier = 'null';
    var unitDefaut = 'mm';
    var unit = unitDefaut ;
    var defintionDefaut = 'standard';
    var unitBaseCalc = 'cm';
    var densite = 10;

    var calculDimDone = false ;
    var NbArrondi=2 ; // Nombre de chiffre après la virgule pour l'arrondi des dimensions.

    //Function Definitions
    //====================================================================
    
   iColorModel.value = colorModel ;
    
  
   document.querySelector(".unitselect").addEventListener("change", function (){
                        unit = this.value ;
                        $("#unitVolume").text( unit + "3") ;
                        CalculNewDim ();
                }, false);
    
   document.querySelector(".defSelect").addEventListener("change", function (){
                        def= this.value ;
                        viewer.setParameter('Definition', def);
                        viewer.init()
                        viewer.update();                
                }, false);
    
    $("input").change(function(){

        //alert ( this.id + " " + this.value );
        if (this.id == "DimX") { coefDim = this.value / RealX ; }
        if (this.id == "DimY") { coefDim = this.value / RealY ;}
        if (this.id == "DimZ") { coefDim = this.value / RealZ ;}
        
        if (this.id == "colorObject") {  colorModel=this.value;  viewer.setParameter('ModelColor', colorModel); viewer.init();viewer.update();}
        if (this.id == "colorBG1") {  colorBG1=this.value;  viewer.setParameter('BackgroundColor1', colorBG1); viewer.init();viewer.update();}
        if (this.id == "colorBG2") {  colorBG2=this.value;  viewer.setParameter('BackgroundColor2', colorBG2); viewer.init();viewer.update();}
        CalculNewDim ();

    });

    var viewer = new JSC3D.Viewer(cv)
    var theScene = new JSC3D.Scene;
    ////Initialize with a default file:
    var stlpath = ""//"../../../assets/2013-10-23/stl/box.STL"
    viewer.setParameter('SceneUrl', stlpath);
    viewer.setParameter('InitRotationX', 20);
    viewer.setParameter('InitRotationY', 20);
    viewer.setParameter('InitRotationZ', 0);
    viewer.setParameter('ModelColor', colorModel );
    viewer.setParameter('BackgroundColor1', colorBG1 );
    viewer.setParameter('BackgroundColor2', colorBG2 );
    viewer.setParameter('Render', 'webgl')
    viewer.init();
    viewer.update();
    ////init done
    var canvas_drop = document.getElementById('canvas-drop')
    /*var dropzone = document.getElementById('dropzone')*/
    canvas_drop.addEventListener('dragover', handleDragOver, false);
    canvas_drop.addEventListener('drop', handleFileSelect, false);

////Drag and drop logic:
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        console.log(evt)
        console.log(files)
        preview_stl(files[0])
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

////Function to detect upload input
    function inputFileSelect(e) {  
        var file = e.target.files[0];
        preview_stl(file);
    }

    document.getElementById('fileupload').addEventListener('change', inputFileSelect, false);

////jsc3d logic
    var handle_file_select = function(e) {
        e.stopPropagation()
        e.preventDefault()
        var f = e.target.files[0]
        preview_stl(f)
    }

    function preview_stl(f) {
        $("#canvas-drop").fadeIn();
        $("#btn-upload").fadeIn();
        var reader = new FileReader()
        var ext = f.name.split(".")[1]

        function setup_viewer() {
            viewer.setParameter('InitRotationX', 20);
            viewer.setParameter('InitRotationY', 20);
            viewer.setParameter('InitRotationZ', 0);
            viewer.setParameter('ModelColor', '#CAA618');
            viewer.setParameter('BackgroundColor1', '#FFFFFF');
            viewer.setParameter('BackgroundColor2', '#383840');
            viewer.setParameter('RenderMode', "flat");
        }
        setup_viewer()

        reader.onload = (function(file) {
            return function(e) {
                theScene = new JSC3D.Scene
                var extension = ext.toLowerCase();
                console.log('Extension => ', extension);

                if(extension == 'stl'){

                    stl_loader = new JSC3D.StlLoader()
                    stl_loader.parseStl(theScene, e.target.result)

                } else if (extension == 'obj'){

                    obj_loader = new JSC3D.ObjLoader()
                    obj_loader.parseObj(theScene, e.target.result)

                } /*else if (extension == 'mtl'){

                    mtl_loader = new JSC3D.ObjLoader()
                    mtl_loader.parseMtl(theScene, e.target.result)
                }*/

                //viewer.init()
                viewer.replaceScene(theScene)
                viewer.update()
                //console.log("file reader onload")
            }
        })(f)

        if (ext.toLowerCase() == "stl" || ext.toLowerCase() == "obj" ) {
            reader.readAsBinaryString(f)
        } else {
            alert("That doesn't appear to be an STL, OBJ file.")
        }
    }

    function computeVolume(mesh) {
        var sum = 0;
        var ibuf = mesh.indexBuffer;
        var vbuf = mesh.vertexBuffer;
        var i = 0, j = 0;
        // walk through all faces, calculating the volume of the mesh 
        while(i < mesh.faceCount) {
          var v0, v1, v2;
          var x0, y0, z0, x1, y1, z1, x2, y2, z2;
          v0 = ibuf[j++] * 3;
          v1 = ibuf[j++] * 3;
          // calculate volume of the polyhedron formed by the origin point and this face
          do {
            v2 = ibuf[j++] * 3;
            x0 = vbuf[v0    ];
            y0 = vbuf[v0 + 1];
            z0 = vbuf[v0 + 2];
            x1 = vbuf[v1    ];
            y1 = vbuf[v1 + 1]; 
            z1 = vbuf[v1 + 2];
            x2 = vbuf[v2    ];
            y2 = vbuf[v2 + 1];
            z2 = vbuf[v2 + 2];
            sum += - x2 * y1 * z0
                   + x1 * y2 * z0 
                   + x2 * y0 * z1
                   - x0 * y2 * z1
                   - x1 * y0 * z2
                   + x0 * y1 * z2;
            v1 = v2;
          } while (ibuf[j] != -1);
          // continue to next face
          j++;
          i++;
        }
        return Math.abs(sum/6);
        };


    function precisionRound(number, precision) {
          var factor = Math.pow(10, precision);
          return Math.round(number * factor) / factor;
        };
    
    
  
    function CalculNewDim () {
              
                DimX.value = precisionRound(RealX*coefDim,NbArrondi);
                DimY.value = precisionRound(RealY*coefDim,NbArrondi);
                DimZ.value = precisionRound(RealZ*coefDim,NbArrondi);
                
                $("#totalVolume").text(precisionRound(totalVolume*(coefDim*coefDim*coefDim),NbArrondi));

                var CoefConvert = ConvertUnit[IdUnit(unit)][IdUnit(unitBaseCalc)] ;
            
                
                //var CoefConvert = ConvertUnit[0][1];
                var VolumeBaseCal = precisionRound(totalVolume*(coefDim*coefDim*coefDim)* (CoefConvert*CoefConvert*CoefConvert),NbArrondi);

                $("#totalVolumeBaseCal").text(VolumeBaseCal);
                $("#poids").text(VolumeBaseCal*densite);
                $("#NbPartie").text(NbPartie);
            };
    
    function IdUnit (U) {
        if (U == "mm") { return 0;}
        if (U == "cm") { return 1;}
        if (U == "m") { return 2;}
        if (U == "inch") { return 3;}
    };
    
    
    
    
    //END Function Definitions
    //====================================================================


    // Handlers
    //=====================================================================

    
      viewer.afterupdate = function () {
        var scene = viewer.getScene();
        if (scene !== null && scene.getChildren().length > 0) {
            
            if (!calculDimDone) {
                
                var aabb = scene.aabb ;
                totalVolume = 0;
                Nbpartie=0;
                // Determine le volume de la piece.
                viewer.getScene().forEachChild( function(mesh) {
                    totalVolume += computeVolume(mesh);
                    NbPartie +=1;
                    } );
            
                //coefDim = document.getElementById('coefDim');     // Récupère le coefdemandé par l'internaute.
                //if coefDim is null { coefDim =1; }
                
                // Transmet les dimension au HTML.
            
                //$("#DimX").text(DimX);
                
                RealX = aabb.maxX - aabb.minX;
                RealY = aabb.maxY - aabb.minY;
                RealZ = aabb.maxZ - aabb.minZ;
                
                CalculNewDim ();

                
                // Affichage dans le viewer JS.
                //ctx.fillText( "DimX = " + precisionRound((aabb.maxX - aabb.minX)*coefDim,NbArrondi)  , 10, 275);
                //ctx.fillText( "MinY = " + precisionRound((aabb.maxY - aabb.minY)*coefDim,NbArrondi)  , 50, 275);
                //ctx.fillText( "MinZ = " + precisionRound((aabb.maxZ - aabb.minZ)*coefDim,NbArrondi)  , 100, 275);
                //ctx.fillText( "Volume = " + precisionRound(totalVolume*(coefDim*coefDim*coefDim),NbArrondi) , 150, 275);
                
                calculDimDone = true ;
                
            }
            
        };
    };
    
    
    
    
    //END Handlers
    //===================================================================

    $("#canvas-drop").hide();

    //Interaction Tip init and behavior
    $("#tip").hide();
    $("#info").mouseenter(function(){
        $("#tip").fadeIn();
    });
    $("#info").mouseleave(function(){
        $("#tip").fadeOut("slow");
    });

    //Render mode selection events
    $("a.rendermode").click(function(evt){
        $mode = $(this).attr("href").substr(1);
        viewer.setRenderMode($mode);
        viewer.update();
    });

});


