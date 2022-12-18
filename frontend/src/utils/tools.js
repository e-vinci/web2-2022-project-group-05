import * as BABYLON from '@babylonjs/core' 

const getRandomInt = (int) => Math.floor(Math.random() * int);

const getRandomIntBetween = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);

const rotateAroundPivot = (pivotPoint, axis, angle) => {
  if (!this._rotationQuaternion) {
    this._rq = BABYLON.Quaternion.RotationYawPitchRoll(
      this.rotation.y,
      this.rotation.x,
      this.rotation.z,
    );
  }
  const _p = new BABYLON.Quaternion(
    this.position.x - pivotPoint.x,
    this.position.y - pivotPoint.y,
    this.position.z - pivotPoint.z,
    0,
  );
  axis.normalize();
  const _q = BABYLON.Quaternion.RotationAxis(axis, angle); // form quaternion rotation
  const _qinv = BABYLON.Quaternion.Inverse(_q);
  const _pdash = _q.multiply(_p).multiply(_qinv);
  this.position = new BABYLON.Vector3(
    pivotPoint.x + _pdash.x,
    pivotPoint.y + _pdash.y,
    pivotPoint.z + _pdash.z,
  );
  this.rotationQuaternion = this._rq.multiply(_q);
  this._rq = this.rotationQuaternion;
};
export { getRandomInt, getRandomIntBetween,rotateAroundPivot };