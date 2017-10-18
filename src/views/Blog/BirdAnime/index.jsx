import React, {Component} from 'react';
import anime from 'animejs';

import './birdAnime.css';


class BirdAnime extends Component {

  componentDidMount() {
    const points = [
      {id: "#b-1", points: "88.38 95.37 138.96 96.02 134.1 133.61 88.38 95.37"},
      {id: "#b-2", points: "157 84.18 146 89 160 115 157 84.18"},
      {id: "#b-3", points: "167 84 157 84 160 115 167 84"},
      {id: "#b-4", points: "146 89 160 115 139 96 146 89"},
      {id: "#b-5", points: "194 95 167 84 160 115 194 95"},
      {id: "#b-6", points: "210 118 160 115 194 95 210 118"},
      {id: "#b-7", points: "169 139 210 118 160 115 169 139"},
      {id: "#b-8", points: "223 160 210 118 169 139 223 160"},
      {id: "#b-9", points: "134 134 160 115 139 95 134 134"},
      {id: "#b-10", points: "169 139 134 134 160 115 169 139"},
      {id: "#b-11", points: "164 164 223 160 169 139 164 164"},
      {id: "#b-12", points: "136 153 169 139 134 134 136 153"},
      {id: "#b-13", points: "136 153 164 164 169 139 136 153"},
      {id: "#b-14", points: "128 180 164 164 136 153 128 180"},
      {id: "#b-15", points: "229 180 164 164 223 160 229 180"},
      {id: "#b-16", points: "142 204 229 180 164 164 142 204"},
      {id: "#b-17", points: "128 180 142 204 164 164 128 180"},
      {id: "#b-18", points: "256 215 142 204 229 180 256 215"},
      {id: "#b-19", points: "146 236 256 215 142 204 146 236"},
      {id: "#b-20", points: "261 236 256 215 146 236 261 236"},
      {id: "#b-21", points: "167 273 261 236 146 236 167 273"},
      {id: "#b-22", points: "267 265 261 236 167 273 267 265"},
      {id: "#b-23", points: "199 307 267 265 167 273 199 307"},
      {id: "#b-24", points: "269 296 267 265 199 307 269 296"},
      {id: "#b-25", points: "223 330 199 307 269 296 223 330"},
      {id: "#b-26", points: "271 326 269 296 223 330 271 326"},
      {id: "#b-27", points: "238 352 271 326 223 330 238 352"},
      {id: "#b-28", points: "272 364 271 326 238 352 272 364"},
      {id: "#b-29", points: "253 371 238 352 272 364 253 371"},
      {id: "#b-30", points: "271 389 272 364 253 371 271 389"},
      {id: "#b-31", points: "115 208 142 204 128 180 115 208"},
      {id: "#b-32", points: "146 236 115 208 142 204 146 236"},
      {id: "#b-33", points: "114 236 146 236 115 208 114 236"},
      {id: "#b-34", points: "167 273 114 236 146 236 167 273"},
      {id: "#b-35", points: "131 293 114 236 167 273 131 293"},
      {id: "#b-36", points: "199 307 131 293 167 273 199 307"},
      {id: "#b-37", points: "153 317 131 293 199 307 153 317"},
      {id: "#b-38", points: "223 330 153 317 199 307 223 330"},
      {id: "#b-39", points: "194 350 223 330 153 317 194 350"},
      {id: "#b-40", points: "238 352 194 350 223 330 238 352"},
      {id: "#b-41", points: "194 350 185 364 153 317 194 350"},
      {id: "#b-42", points: "199 371 194 350 185 364 199 371"},
      {id: "#b-43", points: "188 379 199 371 185 364 188 379"},
      {id: "#b-44", points: "194 389 199 371 188 379 194 389"},
      {id: "#b-45", points: "183 397 194 389 188 379 183 397"},
      {id: "#b-46", points: "194 402 183 397 194 389 194 402"},
      {id: "#b-47", points: "164 413 183 397 194 402 164 413"},
      {id: "#b-48", points: "194 402 200 413 179 407.5 194 402"},
      {id: "#b-49", points: "238 352 210 364 194 350 238 352"},
      {id: "#b-50", points: "253 371 210 364 238 352 253 371"},
      {id: "#b-51", points: "220 395 253 371 210 364 220 395"},
      {id: "#b-52", points: "271 389 220 395 253 371 271 389"},
      {id: "#b-53", points: "223 419 271 389 220 395 223 419"},
      {id: "#b-54", points: "223 419 302 416 271 389 223 419"},
      {id: "#b-55", points: "223 438 302 416 223 419 223 438"},
      {id: "#b-56", points: "312 432 223 438 302 416 312 432"},
      {id: "#b-57", points: "223 457 312 432 223 438 223 457"},
      {id: "#b-58", points: "322 450 223 457 312 432 322 450"},
      {id: "#b-59", points: "223 472 322 450 223 457 223 472"},
      {id: "#b-60", points: "329 463 223 472 322 450 329 463"},
      {id: "#b-61", points: "222 483 329 463 223 472 222 483"},
      {id: "#b-62", points: "332 477 329 463 222 483 332 477"},
      {id: "#b-63", points: "222 483 263 494.36 332 477 222 483"},
      {id: "#b-64", points: "312 498 263 494 332 477 312 498"},
    ]

    const colors = [
      "#b254a1",
      "#863f78",
      "#592a50",
      "#e0bad9",
      "#c276b3",
      "#2d1528",
      "#d198c6",
      "#f0ddec",
    ]

    const birds = document.querySelector('#birds');

    const timeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: true });
    points.forEach((p, i) => {
      timeline
        .add({
          targets: p.id,
          points: {
            value: p.points,
            duration: 1000,
            // easing: 'easeInOutQuad',
            easing: 'easeInSine',
          },
          delay: 1000,
          offset: 1000 + 10 * i,
        })
    })
    timeline.add({
      targets: '#bird',
      opacity: {
        value: 1,
        duration: 1000,
      },

      offset: 3000 + 10 * points.length
    });
    // timeline.add()
  }

  render() {
    return (
      <svg id="birds" className="bird_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
        <defs>
          <style>

          </style>
        </defs>
        <title>birds</title>
        <polygon id="b-1" className="cls-1" points="200 174 206 134 165 154 200 174"/>
        <polygon id="b-2" className="cls-2" points="137 59 177 99 152 129 137 59"/>
        <polygon id="b-3" className="cls-3" points="177 99 206 134 152 129 177 99"/>
        <polygon id="b-4" className="cls-2" points="165 154 152 129 206 134 165 154"/>
        <polygon id="b-5" className="cls-4" points="206 134 224 154 200 174 206 134"/>
        <polygon id="b-6" className="cls-1" points="229 134 224 154 261 150 229 134"/>
        <polygon id="b-7" className="cls-5" points="268 125 229 134 261 150 268 125"/>
        <polygon id="b-8" className="cls-1" points="238 114 229 134 268 125 238 114"/>
        <polygon id="b-9" className="cls-6" points="254 101 238 114 268 125 254 101"/>
        <polygon id="b-10" className="cls-7" points="302 134 293 120 268 125 302 134"/>
        <polygon id="b-11" className="cls-1" points="261 150 302 134 268 125 261 150"/>
        <polygon id="b-12" className="cls-3" points="346 142 302 134 299 152 346 142"/>
        <polygon id="b-13" className="cls-2" points="261 150 299 152 302 134 261 150"/>
        <polygon id="b-14" className="cls-5" points="256 171 224 154 261 150 256 171"/>
        <polygon id="b-15" className="cls-1" points="299 152 256 171 261 150 299 152"/>
        <polygon id="b-16" className="cls-8" points="249 216 271 200 256 171 249 216"/>
        <polygon id="b-17" className="cls-7" points="271 239 271 200 249 216 271 239"/>
        <polygon id="b-18" className="cls-7" points="265 277 271 239 238 247 265 277"/>
        <polygon id="b-19" className="cls-8" points="249 216 238 247 271 239 249 216"/>
        <polygon id="b-20" className="cls-7" points="253 312 265 277 224 270 253 312"/>
        <polygon id="b-21" className="cls-8" points="238 247 224 270 265 277 238 247"/>
        <polygon id="b-22" className="cls-8" points="229 342 253 312 224 270 229 342"/>
        <polygon id="b-23" className="cls-7" points="206 277 224 270 229 342 206 277"/>
        <polygon id="b-24" className="cls-8" points="192 353 229 342 206 277 192 353"/>
        <polygon id="b-25" className="cls-8" points="192 277 171 342 192 353 192 277"/>
        <polygon id="b-26" className="cls-7" points="206 277 192 277 192 353 206 277"/>
        <polygon id="b-27" className="cls-6" points="217 182 256 171 224 154 217 182"/>
        <polygon id="b-28" className="cls-5" points="252.5 193.5 256 171 217 182 252.5 193.5"/>
        <polygon id="b-29" className="cls-2" points="65 94 124 127 84 141 65 94"/>
        <polygon id="b-30" className="cls-3" points="115 193 124 127 84 141 115 193"/>
        <polygon id="b-31" className="cls-2" points="165 154 124 127 115 193 165 154"/>
        <polygon id="b-32" className="cls-3" points="148 239 165 154 115 193 148 239"/>
        <polygon id="b-33" className="cls-2" points="200 174 165 154 148 239 200 174"/>
        <polygon id="b-34" className="cls-3" points="200 174 171 266 148 239 200 174"/>
        <polygon id="b-35" className="cls-3" points="192 277 171 266 217 182 192 277"/>
        <polygon id="b-36" className="cls-2" points="200 174 217 182 171 266 200 174"/>
        <polygon id="b-37" className="cls-2" points="217 182 238 247 192 277 217 182"/>
        <polygon id="b-38" className="cls-6" points="253 193 217 182 249 216 253 193"/>
        <polygon id="b-39" className="cls-5" points="238 247 217 182 249 216 238 247"/>
        <polygon id="b-40" className="cls-5" points="192 277 238 247 224 270 192 277"/>
        <polygon id="b-41" className="cls-6" points="206 277 192 277 224 270 206 277"/>
        <polygon id="b-42" className="cls-7" points="171 266 171 342 192 277 171 266"/>
        <polygon id="b-43" className="cls-1" points="140 306 171 266 171 342 140 306"/>
        <polygon id="b-44" className="cls-5" points="129 334 171 342 140 306 129 334"/>
        <polygon id="b-45" className="cls-1" points="165 363 171 342 129 334 165 363"/>
        <polygon id="b-46" className="cls-5" points="120 363 129 334 165 363 120 363"/>
        <polygon id="b-47" className="cls-1" points="161 391 120 363 165 363 161 391"/>
        <polygon id="b-48" className="cls-6" points="115 406 120 363 161 391 115 406"/>
        <polygon id="b-49" className="cls-5" points="157 429 161 391 115 406 157 429"/>
        <polygon id="b-50" className="cls-5" points="177 479 157 429 174 406 177 479"/>
        <polygon id="b-51" className="cls-1" points="161 391 174 406 157 429 161 391"/>
        <polygon id="b-52" className="cls-5" points="174 377 161 391 174 406 174 377"/>
        <polygon id="b-53" className="cls-9" points="165 363 174 377 161 391 165 363"/>
        <polygon id="b-54" className="cls-2" points="171 342 174 377 165 363 171 342"/>
        <polygon id="b-55" className="cls-6" points="115 406 124 455 157 429 115 406"/>
        <polygon id="b-56" className="cls-5" points="156 463 157 429 124 455 156 463"/>
        <polygon id="b-57" className="cls-6" points="136 479 156 463 124 455 136 479"/>
        <polygon id="b-58" className="cls-5" points="157 483 156 463 136 479 157 483"/>
        <polygon id="b-59" className="cls-6" points="157 483 161 508 136 479 157 483"/>
        <polygon id="b-60" className="cls-1" points="224 154 200 174 217 182 224 154"/>
        <polygon id="b-61" className="cls-7" points="271 200 256 171 299 152 271 200"/>
        <polygon id="b-62" className="cls-1" points="254 101 277 103 268 125 254 101"/>
        <polygon id="b-63" className="cls-6" points="277 103 293 120 268 125 277 103"/>
        <polygon id="b-64" className="cls-6" points="174 377 192 353 171 342 174 377"/>
      </svg>
    )
  }
}

export default BirdAnime;
