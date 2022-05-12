<template>
    <div class="three-image" 

    @mousedown="onDocumentMouseDown($event)"
    @mousemove="onDocumentMouseMove($event)"
    @mouseup="onDocumentMouseUp($event)"
    @mousewheel="onDocumentMouseWheel($event)"
    @dragover="dragover($event)"
    @dragenter="dragenter($event)"
    @dragleave="dragleave($event)"
    @drop="drop($event)"
    ref="container"
    >
        <div  ref="panoramaConianer"></div>
    </div>
</template>

<script>


export default {
    props:["bannerTopImg"],
    data(){
        return {
            camera: null,
            scene: null,
            renderer: null,
            isUserInteracting: false,
            onMouseDownMouseX: 0,
            onMouseDownMouseY: 0,
            lon: 0,
            onMouseDownLon: 0,
            lat: 0,
            onMouseDownLat: 0,
            phi: 0,
            theta: 0,
            material:null
        }
    },
      mounted(){
       this.$nextTick(() =>{
           this.init();
           this.animate();

       })
  },
  methods:{
    init() {
      var container, mesh,wrapContainer;
      container = this.$refs.panoramaConianer;
      wrapContainer = this.$refs.container;

      this.camera = new THREE.PerspectiveCamera( 75, (window.innerWidth-20) / 486,1,1100);
      this.camera.target = new THREE.Vector3(0 , 0 , 0);

      this.scene = new THREE.Scene();

      var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
      // invert the geometry on the x-axis so that all of the faces point inward
      geometry.scale(-1, 1, 1);

      this.material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(this.bannerTopImg)
      });

      mesh = new THREE.Mesh(geometry, this.material);
    
      this.scene.add(mesh);

      this.renderer = new THREE.WebGLRenderer({alpha:true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize((window.innerWidth-20), 486);
      container.appendChild(this.renderer.domElement);

      //

      wrapContainer.addEventListener("resize", this.onWindowResize, false);
    },
    dragover(event){
         console.log("dragover")
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    },
    dragenter(){
        console.log("dragenter")
        event.preventDefault();
        document.body.style.opacity = 0.5;
    },
    dragleave(){
        event.preventDefault();
        document.body.style.opacity = 1;
    },
    drop(event){
        event.preventDefault();
        var me = this;
       if(event.dataTransfer&&event.dataTransfer.files&&event.dataTransfer.files[0]){
            var reader = new FileReader();
            reader.addEventListener("load",function(event) {
                me.material.map.image.src = event.target.result;
                me.material.map.needsUpdate = true;
            },false);
            reader.readAsDataURL(event.dataTransfer.files[0]);
       }
        document.body.style.opacity = 1;
        event.stopPropagation()
    },
    onWindowResize() {
      this.camera.aspect = (window.innerWidth-20) /486;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize((window.innerWidth-20) , 486);
    },
    onDocumentMouseDown(event) {
      event.preventDefault();

      this.isUserInteracting = true;

      this.onMouseDownMouseX = event.clientX;
      this.onMouseDownMouseY = event.clientY;

      this.onMouseDownLon = this.lon;
      this.onMouseDownLat = this.lat;
    },
    onDocumentMouseMove(event) {
      if (this.isUserInteracting === true) {
        this.lon = (this.onMouseDownMouseX - event.clientX) * 0.1 + this.onMouseDownLon;
        this.lat = (event.clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;
      }
    },
    onDocumentMouseUp(event) {
      this.isUserInteracting = false;
    },
    onDocumentMouseWheel(event) {
      var event = event || window.event;
      var fov = this.camera.fov + event.deltaY * 0.05;

      this.camera.fov = THREE.Math.clamp(fov, 10, 75);

      this.camera.updateProjectionMatrix();
       if (event.preventDefault) {
            event.preventDefault();
        }
    },
    animate() {
      this.animationID =  requestAnimationFrame(this.animate);
      this.update();
    },
    update() {
      if (this.isUserInteracting === false) {
        this.lon += 0.1;
      }
      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = THREE.Math.degToRad(90 - this.lat);
      this.theta = THREE.Math.degToRad(this.lon);

      this.camera.target.x = 5 * Math.sin(this.phi) * Math.cos(this.theta);
      this.camera.target.y = 5 * Math.cos(this.phi);
      this.camera.target.z = 5 * Math.sin(this.phi) * Math.sin(this.theta);

      this.camera.lookAt(this.camera.target);

      this.renderer.render(this.scene, this.camera);
    },
  },
  destroyed(){
      if(this.animationID){
        window.cancelAnimationFrame(this.animationID);
      }
  }

}
</script>
<style lang="scss" scoped>
.three-image{
    height: 100%;
    #panoramaConianer{
        cursor: pointer;
    }
}
</style>
