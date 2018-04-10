import React, { Component } from 'react'

export class notificationSettings extends Component {
  render() {
    return (
      <div>
        Accordion
        csinalsz accordion containert amiben az adattombre fogod mapelni az accordion itemeket
mindegyiknek adsz egy onClick propertyt
amit egy fuggvenyre kotsz a containerben
abban megnezed melyikre kattintottak
beleteszed statebe a key, vagy id-jat
es amikor renderben map-eled, akkor megvizsgalod hogy melyiknek az idje van a stateben
es ha igaz, akkor berakod az isOpen propertyt
a tobbieknek meg nem rakod be
      </div>
    )
  }
}

export default notificationSettings
