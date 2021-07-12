let framerate = 60, speed = 'Standard', measured_time = 0, adjusted_time = 0, sft = 0, eft = 0;


localStorage.fishes_mod_message = localStorage.fishes_mod_message || 'Mod note:\nRun starts at {start} and ends at {end} (at {fps} FPS), for a real time of {real_time}.\nAt {speed} Speed, in-game time is {game_time}.\nRetimed using [Google Snake Retime Tool](https://fizhes.github.io/snake_retiming/).';

const ta = document.getElementById('mod_note_edit');
ta.value = localStorage.fishes_mod_message;
ta.onchange = function() {
  localStorage.fishes_mod_message = ta.value;
};

let button = document.getElementById('copy_mod');
button.onclick = function() {
  cool_cat_function();
  navigator.clipboard.writeText(
    localStorage.fishes_mod_message.replace(
      '{start}',
      format_time(sft)
    ).replace(
      '{end}',
      format_time(eft)
    ).replace(
      '{fps}',
      framerate
    ).replace(
      '{speed}',
      speed
    ).replace(
      '{real_time}',
      format_time(measured_time)
    ).replace(
      '{game_time}',
      format_time(adjusted_time)
    ).replaceAll(
      '\\n',
      '\n'
    )
  );
};

document.getElementById('calculate').onclick = cool_cat_function;


function cool_cat_function() {
  framerate = (+document.querySelector('#framerate').value) || 60;
  const start_frame_debug = document.querySelector('#start').value || '{"cmt": "0"}';
  const end_frame_debug = document.querySelector('#end').value || '{"cmt": "0"}';
  speed = document.querySelector('#speed').value;

  // console.log(start_frame_debug, end_frame_debug);

  let tick_length;
  if(speed === 'Standard')
    tick_length = 0.135;
  else if(speed === 'Fast')
    tick_length = 0.0891;
  else
    tick_length = 0.17955;
  
  sft = Math.floor(framerate * +JSON.parse(start_frame_debug)['cmt']) / framerate;
  eft = Math.floor(framerate * +JSON.parse(end_frame_debug)['cmt']) / framerate;

  measured_time = eft - sft;
  
  const ticks = Math.round(measured_time / tick_length);
  // console.log(ticks);

  adjusted_time = ticks * tick_length;


  document.getElementById('real_time').innerHTML = 'Real Time: ' + format_time(measured_time, false);
  document.getElementById('game_time').innerHTML = 'Game Time: ' + format_time(adjusted_time, true);
  
};

const format_time = function(t, truncate) {
  let minutes = ~~(t / 60);
  let seconds = ~~(t % 60);
  let m       =    t % 1; 

  return minutes + ':' + ('' + seconds).padStart(2, '0') + '.' + (truncate ? m.toFixed(4).substring(2, 5) : m.toFixed(3).substring(2, 5));
}