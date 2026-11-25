async function initMap() {
    await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/v3/?apikey=25b25e10-a4b3-4ce4-9853-da185ff69c95&lang=ru_RU';
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener('error', reject, { once: true });
        document.head.append(script);
    });

    await ymaps3.ready;
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
        '@yandex/ymaps3-default-ui-theme@0.0.23'
    ]);

    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.588144, 55.733842],
                zoom: 11
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const response = await fetch('data/apartments.json');
    if (!response.ok) {
        throw new Error('Не удалось загрузить список апартаментов');
    }

    const apartments = await response.json();
    apartments.forEach(apartment => {
        map.addChild(new YMapDefaultMarker({
            title: apartment.name,
            subtitle: apartment.desc,
            coordinates: apartment.coordinates,
            staticHint: true
        }));
    });
    document.getElementById('mapFallback').hidden = true;
}

initMap().catch(error => console.error('Не удалось загрузить карту', error));
