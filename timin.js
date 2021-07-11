const add_option = function(select, option) {
  let _option = document.createElement('option');
  _option.value = option;
  _option.innerHTML = option;
  select.options.add(_option);
};

document.body.innerHTML = document.head.innerHTML = '';


let label_framerate = document.createElement('label');
label_framerate.innerHTML = 'Video Framerate: ';
label_framerate.for = 'framerate';
let input_framerate = document.createElement('input');
input_framerate.type = 'text';
input_framerate.id = input_framerate.name = 'framerate';
input_framerate.size = '10';
document.body.appendChild(label_framerate);
document.body.appendChild(input_framerate);

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));


let label_start = document.createElement('label');
label_start.innerHTML = 'Start Frame Debug Info: ';
label_start.for = 'start';
let input_start = document.createElement('input');
input_start.type = 'text';
input_start.id = input_start.name = 'start';
input_start.size = '10';
document.body.appendChild(label_start);
document.body.appendChild(input_start);

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));


let label_end = document.createElement('label');
label_end.innerHTML = 'End Frame Debug Info: ';
label_start.for = 'end';
let input_end = document.createElement('input');
input_end.type = 'text';
input_end.size = '10';
input_end.id = input_end.name = 'end';
document.body.appendChild(label_end);
document.body.appendChild(input_end);

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));



document.body.innerHTML += 'Speed: ';
let dropdown_speed = document.createElement('select');
dropdown_speed.id = 'speed';
add_option(dropdown_speed, 'Standard');
add_option(dropdown_speed, 'Fast');
add_option(dropdown_speed, 'Slow');
document.body.appendChild(dropdown_speed);


document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));

let output1 = document.createElement('div');
let output2 = document.createElement('div');

let measured_time = 0, adjusted_time = 0;
let sft = 0, eft = 0;
let framerate = 60;
let speed = 'Standard';

let button = document.createElement('button');
button.innerHTML = 'Calculate';
button.onclick = function() {
  framerate = (+document.querySelector('#framerate').value) || 60;
  const start_frame_debug = document.querySelector('#start').value || '{\'cmt\': \'0\'}';
  const end_frame_debug = document.querySelector('#end').value || '{\'cmt\': \'0\'}';
  speed = document.querySelector('#speed').value;

  let tick_length;
  if(speed === 'Standard')
    tick_length = 0.135;
  else if(speed === 'Fast')
    tick_length = 0.0891;
  else
    tick_length = 0.17955;
  
  sft = Math.round(framerate * +JSON.parse(start_frame_debug)['cmt']) / framerate;
  eft = Math.round(framerate * +JSON.parse(end_frame_debug)['cmt']) / framerate;

  measured_time = eft - sft;
  
  const ticks = Math.round(measured_time / tick_length);
  console.log(ticks);

  adjusted_time = ticks * tick_length;


  
  output1.innerHTML = 'Real Time:    ' + format_time(measured_time);
  output2.innerHTML = 'In-Game Time: ' + format_time(adjusted_time);
};
document.body.appendChild(button);

let copy_button = document.createElement('button');
copy_button.innerHTML = 'Copy Message';
copy_button.onclick = function() {
  navigator.clipboard.writeText(
    `Run starts at ${format_time(sft)} and ends at ${format_time(eft)} (at ${framerate} FPS), for a real time of ${format_time(measured_time)}.\nAt ${speed} Speed, in-game time is ${format_time(adjusted_time)}.`
  );
};
document.body.appendChild(copy_button);

document.body.appendChild(output1);
document.body.appendChild(output2);

const format_time = function(t) {
  let minutes = ~~(t / 60);
  let seconds = ~~(t % 60);
  let m       =    t % 1; 

  return minutes + ':' + ('' + seconds).padStart(2, '0') + '.' + ('' + m).replace('0.', '').padEnd(3, '0').substring(0, 3);
}