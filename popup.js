document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save1').addEventListener('click', function () {
    confirmAction('save', 'slot1');
  });
  document.getElementById('save2').addEventListener('click', function () {
    confirmAction('save', 'slot2');
  });
  document.getElementById('save3').addEventListener('click', function () {
    confirmAction('save', 'slot3');
  });

  document.getElementById('load1').addEventListener('click', function () {
    confirmAction('load', 'slot1');
  });
  document.getElementById('load2').addEventListener('click', function () {
    confirmAction('load', 'slot2');
  });
  document.getElementById('load3').addEventListener('click', function () {
    confirmAction('load', 'slot3');
  });
});

function confirmAction(action, slot) {
  const actionText = action === 'save' ? 'save to' : 'load from';
  const confirmation = confirm(`Are you sure you want to ${actionText} ${slot}?`);
  if (confirmation) {
    if (action === 'save') {
      saveNoteToStorage(slot);
    } else {
      loadNoteFromStorage(slot);
    }
  }
}

function saveNoteToStorage(slot) {
  const title = document.getElementById('title_input').value;
  const note = document.getElementById('notes_input').value;
  chrome.storage.sync.set({ [slot]: { title, note } }, function () {
    alert(`Note saved in ${slot}`);
  });
}

function loadNoteFromStorage(slot) {
  chrome.storage.sync.get([slot], function (result) {
    if (result[slot]) {
      document.getElementById('title_input').value = result[slot].title;
      document.getElementById('notes_input').value = result[slot].note;
    } else {
      alert(`No note found in ${slot}`);
    }
  });
}
