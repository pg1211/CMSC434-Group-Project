document.getElementById('region-select').addEventListener('change', function() {
    if (this.value === 'add-region') {
      document.getElementById('add-region-popup').style.display = 'block';
    }
  });
  
  document.getElementById('cancel-region-btn').addEventListener('click', function() {
    document.getElementById('add-region-popup').style.display = 'none';
  });
  
  document.getElementById('add-region-btn').addEventListener('click', function() {
    const newRegion = document.getElementById('new-region-name').value;
    if (newRegion) {
      const select = document.getElementById('region-select');
      const newOption = document.createElement('option');
      newOption.value = newRegion.toLowerCase().replace(/\s+/g, '-');
      newOption.text = newRegion;
      select.add(newOption, select.options.length - 1);
      document.getElementById('add-region-popup').style.display = 'none';
    }
  });