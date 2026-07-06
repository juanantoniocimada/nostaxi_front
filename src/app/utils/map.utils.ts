
export const tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const stopDivIcon = {
  className: 'custom-icon',
  html: '<div style="background-color: #4a2829; width: 100%; height: 100%; border-radius: 50%;"></div>',
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5]
}

export const stopDisabledDivIcon = {
  className: 'custom-icon',
  html: '<div style="background-color: #CF2027; width: 100%; height: 100%; border-radius: 50%;"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
}

export const busDivIcon = {
  className: 'icon-bus-location-inner',
  html: '<div style="background-color: #FFD300; width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #000;">🚕</div>',
  iconSize: [60, 60],
  iconAnchor: [60, 60]
};

export const userDivIcon = {
  className: 'icon-user-location-inner',
  html: '<div style="background-color: #003893; width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; color: #fff; font-size: 28px;">👤</div>',
  iconSize: [60, 60],
  iconAnchor: [60, 60]
};