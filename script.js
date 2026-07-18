document.getElementById('getStartedBtn').addEventListener('click', function() {
  document.getElementById('homeScreen').style.display = 'none'
  document.getElementById('whoScreen').style.display = 'flex'
})

document.getElementById('myselfBtn').addEventListener('click', function() {
  document.getElementById('whoScreen').style.display = 'none'
  document.getElementById('nameLabel').textContent = 'What is your name?'
  document.getElementById('nameInput').placeholder = 'Enter your name'
  document.getElementById('nameScreen').style.display = 'flex'
})

document.getElementById('someoneBtn').addEventListener('click', function() {
  document.getElementById('whoScreen').style.display = 'none'
  document.getElementById('nameLabel').textContent = 'What is your patient\'s name?'
  document.getElementById('nameInput').placeholder = 'Enter patient\'s name'
  document.getElementById('nameScreen').style.display = 'flex'
})

document.getElementById('nameInput').addEventListener('input', function() {
  document.getElementById('nameError').style.display = 'none'
})

document.getElementById('nameNextBtn').addEventListener('click', function() {
  var nameValue = document.getElementById('nameInput').value.trim()
  var nameError = document.getElementById('nameError')

  if (nameValue === '') {
    nameError.style.display = 'block'
    return
  }

  nameError.style.display = 'none'
  document.getElementById('nameScreen').style.display = 'none'
  document.getElementById('accessibilityScreen').style.display = 'flex'
})

var visionCheck = document.getElementById('visionCheck')
var hearingCheck = document.getElementById('hearingCheck')
var noneCheck = document.getElementById('noneCheck')

visionCheck.addEventListener('change', function() {
  if (visionCheck.checked || hearingCheck.checked) {
    noneCheck.checked = false
  }
})

hearingCheck.addEventListener('change', function() {
  if (visionCheck.checked || hearingCheck.checked) {
    noneCheck.checked = false
  }
})

noneCheck.addEventListener('change', function() {
  if (noneCheck.checked) {
    visionCheck.checked = false
    hearingCheck.checked = false
  }
})

document.getElementById('accessNextBtn').addEventListener('click', function() {
  document.getElementById('accessibilityScreen').style.display = 'none'
  document.getElementById('languageScreen').style.display = 'flex'

  if (visionCheck.checked) {
    document.querySelector('.app').classList.add('large-text')
  }
})

// ===== LANGUAGE / TRANSLATION SYSTEM =====

var selectedLanguage = 'en'

var speechLangMap = {
  en: 'en-US', hi: 'hi-IN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', zh: 'zh-CN',
  pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', ko: 'ko-KR', de: 'de-DE', it: 'it-IT',
  tr: 'tr-TR', vi: 'vi-VN', tl: 'tl-PH', ur: 'ur-PK'
}

var translations = {
  en: {
    medScreenLabel: 'Add a medicine',
    medNamePlaceholder: 'Medicine name',
    medDosagePlaceholder: 'Dosage (number of tablets)',
    medCountPlaceholder: 'Starting tablet count',
    daysLabel: 'Which days?',
    days: { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' },
    freqLabel: 'How often?',
    weekly: 'Every week', biweekly: 'Every 2 weeks', monthly: 'Every month',
    notesLabel: 'Anything else to know?',
    notesPlaceholder: 'e.g. take with food, before bed, watch for dizziness (optional)',
    medErrorText: 'Please fill in medicine name, dosage, starting count, time, and at least one day to continue',
    medNextBtn: 'Add medicine',
    reminderLabel: 'Next reminder',
    holdHintText: 'Hold anywhere for 3 seconds, or say "I took it"',
    holdToConfirm: 'Hold to confirm',
    keepHolding: 'Keep holding...',
    confirmedText: 'Confirmed!',
    speechPrefix: 'Time to take '
  },
  hi: {
    medScreenLabel: 'दवा जोड़ें',
    medNamePlaceholder: 'दवा का नाम',
    medDosagePlaceholder: 'खुराक (गोलियों की संख्या)',
    medCountPlaceholder: 'शुरुआती गोलियों की संख्या',
    daysLabel: 'कौन से दिन?',
    days: { mon: 'सोम', tue: 'मंगल', wed: 'बुध', thu: 'गुरु', fri: 'शुक्र', sat: 'शनि', sun: 'रवि' },
    freqLabel: 'कितनी बार?',
    weekly: 'हर हफ्ते', biweekly: 'हर 2 हफ्ते', monthly: 'हर महीने',
    notesLabel: 'और कुछ जानना ज़रूरी है?',
    notesPlaceholder: 'जैसे खाने के साथ लें, सोने से पहले, चक्कर का ध्यान रखें (वैकल्पिक)',
    medErrorText: 'कृपया दवा का नाम, खुराक, शुरुआती गिनती, समय और कम से कम एक दिन भरें',
    medNextBtn: 'दवा जोड़ें',
    reminderLabel: 'अगला रिमाइंडर',
    holdHintText: 'कहीं भी 3 सेकंड दबाए रखें, या कहें "मैंने ले ली"',
    holdToConfirm: 'पुष्टि के लिए दबाए रखें',
    keepHolding: 'दबाए रखें...',
    confirmedText: 'पुष्टि हो गई!',
    speechPrefix: 'अब लेने का समय है '
  },
  es: {
    medScreenLabel: 'Agregar un medicamento',
    medNamePlaceholder: 'Nombre del medicamento',
    medDosagePlaceholder: 'Dosis (número de pastillas)',
    medCountPlaceholder: 'Cantidad inicial de pastillas',
    daysLabel: '¿Qué días?',
    days: { mon: 'Lun', tue: 'Mar', wed: 'Mié', thu: 'Jue', fri: 'Vie', sat: 'Sáb', sun: 'Dom' },
    freqLabel: '¿Con qué frecuencia?',
    weekly: 'Cada semana', biweekly: 'Cada 2 semanas', monthly: 'Cada mes',
    notesLabel: '¿Algo más que debamos saber?',
    notesPlaceholder: 'ej. tomar con comida, antes de dormir, vigilar mareos (opcional)',
    medErrorText: 'Por favor complete el nombre del medicamento, la dosis, la cantidad inicial, la hora y al menos un día para continuar',
    medNextBtn: 'Agregar medicamento',
    reminderLabel: 'Próximo recordatorio',
    holdHintText: 'Mantenga presionado en cualquier parte por 3 segundos, o diga "Lo tomé"',
    holdToConfirm: 'Mantenga presionado para confirmar',
    keepHolding: 'Sigue presionando...',
    confirmedText: '¡Confirmado!',
    speechPrefix: 'Es hora de tomar '
  },
  ar: {
    medScreenLabel: 'إضافة دواء',
    medNamePlaceholder: 'اسم الدواء',
    medDosagePlaceholder: 'الجرعة (عدد الأقراص)',
    medCountPlaceholder: 'عدد الأقراص الأولي',
    daysLabel: 'ما هي الأيام؟',
    days: { mon: 'إثنين', tue: 'ثلاثاء', wed: 'أربعاء', thu: 'خميس', fri: 'جمعة', sat: 'سبت', sun: 'أحد' },
    freqLabel: 'كم مرة؟',
    weekly: 'كل أسبوع', biweekly: 'كل أسبوعين', monthly: 'كل شهر',
    notesLabel: 'هل هناك شيء آخر يجب معرفته؟',
    notesPlaceholder: 'مثال: تناوله مع الطعام، قبل النوم، انتبه للدوار (اختياري)',
    medErrorText: 'يرجى تعبئة اسم الدواء والجرعة والعدد الأولي والوقت ويوم واحد على الأقل للمتابعة',
    medNextBtn: 'إضافة الدواء',
    reminderLabel: 'التذكير التالي',
    holdHintText: 'اضغط مطولاً في أي مكان لمدة 3 ثوانٍ، أو قل "لقد تناولته"',
    holdToConfirm: 'اضغط مطولاً للتأكيد',
    keepHolding: 'استمر بالضغط...',
    confirmedText: 'تم التأكيد!',
    speechPrefix: 'حان وقت تناول '
  },
  fr: {
    medScreenLabel: 'Ajouter un médicament',
    medNamePlaceholder: 'Nom du médicament',
    medDosagePlaceholder: 'Dosage (nombre de comprimés)',
    medCountPlaceholder: 'Nombre initial de comprimés',
    daysLabel: 'Quels jours ?',
    days: { mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim' },
    freqLabel: 'À quelle fréquence ?',
    weekly: 'Chaque semaine', biweekly: 'Toutes les 2 semaines', monthly: 'Chaque mois',
    notesLabel: 'Autre chose à savoir ?',
    notesPlaceholder: 'ex. à prendre avec de la nourriture, avant de dormir, attention aux vertiges (facultatif)',
    medErrorText: 'Veuillez remplir le nom du médicament, le dosage, le nombre initial, l\'heure et au moins un jour pour continuer',
    medNextBtn: 'Ajouter le médicament',
    reminderLabel: 'Prochain rappel',
    holdHintText: 'Maintenez appuyé n\'importe où pendant 3 secondes, ou dites "Je l\'ai pris"',
    holdToConfirm: 'Maintenez appuyé pour confirmer',
    keepHolding: 'Continuez à appuyer...',
    confirmedText: 'Confirmé !',
    speechPrefix: 'Il est temps de prendre '
  },
  zh: {
    medScreenLabel: '添加药物',
    medNamePlaceholder: '药物名称',
    medDosagePlaceholder: '剂量（药片数量）',
    medCountPlaceholder: '初始药片数量',
    daysLabel: '哪几天？',
    days: { mon: '周一', tue: '周二', wed: '周三', thu: '周四', fri: '周五', sat: '周六', sun: '周日' },
    freqLabel: '频率？',
    weekly: '每周', biweekly: '每两周', monthly: '每月',
    notesLabel: '还有什么需要注意的吗？',
    notesPlaceholder: '例如：随餐服用、睡前服用、注意头晕（可选）',
    medErrorText: '请填写药物名称、剂量、初始数量、时间和至少一天后继续',
    medNextBtn: '添加药物',
    reminderLabel: '下一次提醒',
    holdHintText: '按住屏幕任意位置3秒，或说"我吃了"',
    holdToConfirm: '按住以确认',
    keepHolding: '继续按住...',
    confirmedText: '已确认！',
    speechPrefix: '该吃药了：'
  },
  pt: {
    medScreenLabel: 'Adicionar um medicamento',
    medNamePlaceholder: 'Nome do medicamento',
    medDosagePlaceholder: 'Dosagem (número de comprimidos)',
    medCountPlaceholder: 'Quantidade inicial de comprimidos',
    daysLabel: 'Quais dias?',
    days: { mon: 'Seg', tue: 'Ter', wed: 'Qua', thu: 'Qui', fri: 'Sex', sat: 'Sáb', sun: 'Dom' },
    freqLabel: 'Com que frequência?',
    weekly: 'Toda semana', biweekly: 'A cada 2 semanas', monthly: 'Todo mês',
    notesLabel: 'Algo mais a saber?',
    notesPlaceholder: 'ex. tomar com comida, antes de dormir, atenção a tonturas (opcional)',
    medErrorText: 'Por favor preencha o nome do medicamento, dosagem, quantidade inicial, horário e pelo menos um dia para continuar',
    medNextBtn: 'Adicionar medicamento',
    reminderLabel: 'Próximo lembrete',
    holdHintText: 'Segure em qualquer lugar por 3 segundos, ou diga "Eu tomei"',
    holdToConfirm: 'Segure para confirmar',
    keepHolding: 'Continue segurando...',
    confirmedText: 'Confirmado!',
    speechPrefix: 'Hora de tomar '
  },
  ru: {
    medScreenLabel: 'Добавить лекарство',
    medNamePlaceholder: 'Название лекарства',
    medDosagePlaceholder: 'Доза (количество таблеток)',
    medCountPlaceholder: 'Начальное количество таблеток',
    daysLabel: 'Какие дни?',
    days: { mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Вс' },
    freqLabel: 'Как часто?',
    weekly: 'Каждую неделю', biweekly: 'Раз в 2 недели', monthly: 'Каждый месяц',
    notesLabel: 'Есть ли что-то ещё, что нужно знать?',
    notesPlaceholder: 'напр. принимать с едой, перед сном, следить за головокружением (необязательно)',
    medErrorText: 'Пожалуйста, заполните название лекарства, дозу, начальное количество, время и выберите хотя бы один день',
    medNextBtn: 'Добавить лекарство',
    reminderLabel: 'Следующее напоминание',
    holdHintText: 'Удерживайте экран 3 секунды или скажите "Я принял"',
    holdToConfirm: 'Удерживайте для подтверждения',
    keepHolding: 'Продолжайте удерживать...',
    confirmedText: 'Подтверждено!',
    speechPrefix: 'Пора принять '
  },
  ja: {
    medScreenLabel: '薬を追加',
    medNamePlaceholder: '薬の名前',
    medDosagePlaceholder: '用量（錠数）',
    medCountPlaceholder: '初期の錠数',
    daysLabel: 'どの曜日？',
    days: { mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日' },
    freqLabel: '頻度は？',
    weekly: '毎週', biweekly: '2週間ごと', monthly: '毎月',
    notesLabel: '他に知っておくべきことは？',
    notesPlaceholder: '例：食事と一緒に、就寝前に、めまいに注意（任意）',
    medErrorText: '薬の名前、用量、初期の錠数、時間、少なくとも1日を入力してください',
    medNextBtn: '薬を追加',
    reminderLabel: '次のリマインダー',
    holdHintText: '画面のどこでも3秒間押し続けるか、「飲みました」と言ってください',
    holdToConfirm: '押し続けて確認',
    keepHolding: '押し続けてください...',
    confirmedText: '確認しました！',
    speechPrefix: '服用の時間です: '
  },
  ko: {
    medScreenLabel: '약 추가',
    medNamePlaceholder: '약 이름',
    medDosagePlaceholder: '복용량 (알약 개수)',
    medCountPlaceholder: '시작 알약 개수',
    daysLabel: '어떤 요일?',
    days: { mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일' },
    freqLabel: '얼마나 자주?',
    weekly: '매주', biweekly: '격주', monthly: '매달',
    notesLabel: '알아야 할 다른 사항이 있나요?',
    notesPlaceholder: '예: 음식과 함께, 자기 전에, 어지럼증 주의 (선택사항)',
    medErrorText: '약 이름, 복용량, 시작 개수, 시간, 최소 하루를 입력해 주세요',
    medNextBtn: '약 추가',
    reminderLabel: '다음 알림',
    holdHintText: '화면 아무 곳이나 3초간 누르거나 "먹었어요"라고 말하세요',
    holdToConfirm: '눌러서 확인',
    keepHolding: '계속 누르세요...',
    confirmedText: '확인됨!',
    speechPrefix: '복용할 시간입니다: '
  },
  de: {
    medScreenLabel: 'Medikament hinzufügen',
    medNamePlaceholder: 'Medikamentenname',
    medDosagePlaceholder: 'Dosierung (Anzahl der Tabletten)',
    medCountPlaceholder: 'Anfängliche Tablettenanzahl',
    daysLabel: 'Welche Tage?',
    days: { mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr', sat: 'Sa', sun: 'So' },
    freqLabel: 'Wie oft?',
    weekly: 'Jede Woche', biweekly: 'Alle 2 Wochen', monthly: 'Jeden Monat',
    notesLabel: 'Noch etwas zu beachten?',
    notesPlaceholder: 'z.B. mit Essen einnehmen, vor dem Schlafen, auf Schwindel achten (optional)',
    medErrorText: 'Bitte füllen Sie Medikamentenname, Dosierung, Anfangsanzahl, Uhrzeit und mindestens einen Tag aus',
    medNextBtn: 'Medikament hinzufügen',
    reminderLabel: 'Nächste Erinnerung',
    holdHintText: 'Halten Sie 3 Sekunden gedrückt oder sagen Sie "Ich habe es genommen"',
    holdToConfirm: 'Zum Bestätigen gedrückt halten',
    keepHolding: 'Weiter gedrückt halten...',
    confirmedText: 'Bestätigt!',
    speechPrefix: 'Zeit zur Einnahme von '
  },
  it: {
    medScreenLabel: 'Aggiungi un medicinale',
    medNamePlaceholder: 'Nome del medicinale',
    medDosagePlaceholder: 'Dosaggio (numero di compresse)',
    medCountPlaceholder: 'Numero iniziale di compresse',
    daysLabel: 'Quali giorni?',
    days: { mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Gio', fri: 'Ven', sat: 'Sab', sun: 'Dom' },
    freqLabel: 'Con che frequenza?',
    weekly: 'Ogni settimana', biweekly: 'Ogni 2 settimane', monthly: 'Ogni mese',
    notesLabel: 'Altro da sapere?',
    notesPlaceholder: 'es. assumere con cibo, prima di dormire, attenzione ai capogiri (facoltativo)',
    medErrorText: 'Inserire nome del medicinale, dosaggio, quantità iniziale, ora e almeno un giorno per continuare',
    medNextBtn: 'Aggiungi medicinale',
    reminderLabel: 'Prossimo promemoria',
    holdHintText: 'Tieni premuto ovunque per 3 secondi, oppure dì "L\'ho preso"',
    holdToConfirm: 'Tieni premuto per confermare',
    keepHolding: 'Continua a tenere premuto...',
    confirmedText: 'Confermato!',
    speechPrefix: 'È ora di prendere '
  },
  tr: {
    medScreenLabel: 'İlaç ekle',
    medNamePlaceholder: 'İlaç adı',
    medDosagePlaceholder: 'Doz (tablet sayısı)',
    medCountPlaceholder: 'Başlangıç tablet sayısı',
    daysLabel: 'Hangi günler?',
    days: { mon: 'Pzt', tue: 'Sal', wed: 'Çar', thu: 'Per', fri: 'Cum', sat: 'Cmt', sun: 'Paz' },
    freqLabel: 'Ne sıklıkla?',
    weekly: 'Her hafta', biweekly: 'Her 2 haftada bir', monthly: 'Her ay',
    notesLabel: 'Bilinmesi gereken başka bir şey var mı?',
    notesPlaceholder: 'örn. yemekle birlikte alın, yatmadan önce, baş dönmesine dikkat (isteğe bağlı)',
    medErrorText: 'Lütfen devam etmek için ilaç adı, doz, başlangıç sayısı, saat ve en az bir gün girin',
    medNextBtn: 'İlaç ekle',
    reminderLabel: 'Sonraki hatırlatma',
    holdHintText: 'Herhangi bir yere 3 saniye basılı tutun veya "Aldım" deyin',
    holdToConfirm: 'Onaylamak için basılı tutun',
    keepHolding: 'Basılı tutmaya devam edin...',
    confirmedText: 'Onaylandı!',
    speechPrefix: 'Alma zamanı: '
  },
  vi: {
    medScreenLabel: 'Thêm thuốc',
    medNamePlaceholder: 'Tên thuốc',
    medDosagePlaceholder: 'Liều lượng (số viên)',
    medCountPlaceholder: 'Số viên ban đầu',
    daysLabel: 'Những ngày nào?',
    days: { mon: 'T2', tue: 'T3', wed: 'T4', thu: 'T5', fri: 'T6', sat: 'T7', sun: 'CN' },
    freqLabel: 'Tần suất?',
    weekly: 'Mỗi tuần', biweekly: 'Mỗi 2 tuần', monthly: 'Mỗi tháng',
    notesLabel: 'Còn điều gì khác cần biết không?',
    notesPlaceholder: 'vd: uống cùng thức ăn, trước khi ngủ, chú ý chóng mặt (không bắt buộc)',
    medErrorText: 'Vui lòng điền tên thuốc, liều lượng, số lượng ban đầu, thời gian và ít nhất một ngày để tiếp tục',
    medNextBtn: 'Thêm thuốc',
    reminderLabel: 'Lời nhắc tiếp theo',
    holdHintText: 'Giữ ở bất kỳ đâu trong 3 giây, hoặc nói "Tôi đã uống"',
    holdToConfirm: 'Giữ để xác nhận',
    keepHolding: 'Tiếp tục giữ...',
    confirmedText: 'Đã xác nhận!',
    speechPrefix: 'Đến giờ uống '
  },
  tl: {
    medScreenLabel: 'Magdagdag ng gamot',
    medNamePlaceholder: 'Pangalan ng gamot',
    medDosagePlaceholder: 'Dosis (bilang ng tableta)',
    medCountPlaceholder: 'Paunang bilang ng tableta',
    daysLabel: 'Anong mga araw?',
    days: { mon: 'Lun', tue: 'Mar', wed: 'Miy', thu: 'Huw', fri: 'Biy', sat: 'Sab', sun: 'Lin' },
    freqLabel: 'Gaano kadalas?',
    weekly: 'Bawat linggo', biweekly: 'Bawat 2 linggo', monthly: 'Bawat buwan',
    notesLabel: 'May iba pa bang dapat malaman?',
    notesPlaceholder: 'hal. inumin kasabay ng pagkain, bago matulog, bantayan ang pagkahilo (opsyonal)',
    medErrorText: 'Pakipunan ang pangalan ng gamot, dosis, paunang bilang, oras, at kahit isang araw para magpatuloy',
    medNextBtn: 'Idagdag ang gamot',
    reminderLabel: 'Susunod na paalala',
    holdHintText: 'Pindutin nang matagal kahit saan sa loob ng 3 segundo, o sabihing "Nainom ko na"',
    holdToConfirm: 'Pindutin nang matagal para kumpirmahin',
    keepHolding: 'Patuloy na pindutin...',
    confirmedText: 'Nakumpirma!',
    speechPrefix: 'Oras na para inumin ang '
  },
  ur: {
    medScreenLabel: 'دوا شامل کریں',
    medNamePlaceholder: 'دوا کا نام',
    medDosagePlaceholder: 'خوراک (گولیوں کی تعداد)',
    medCountPlaceholder: 'ابتدائی گولیوں کی تعداد',
    daysLabel: 'کون سے دن؟',
    days: { mon: 'پیر', tue: 'منگل', wed: 'بدھ', thu: 'جمعرات', fri: 'جمعہ', sat: 'ہفتہ', sun: 'اتوار' },
    freqLabel: 'کتنی بار؟',
    weekly: 'ہر ہفتے', biweekly: 'ہر 2 ہفتے', monthly: 'ہر مہینے',
    notesLabel: 'کیا کوئی اور بات جاننا ضروری ہے؟',
    notesPlaceholder: 'مثلاً کھانے کے ساتھ لیں، سونے سے پہلے، چکر کا خیال رکھیں (اختیاری)',
    medErrorText: 'براہ کرم دوا کا نام، خوراک، ابتدائی تعداد، وقت، اور کم از کم ایک دن درج کریں',
    medNextBtn: 'دوا شامل کریں',
    reminderLabel: 'اگلی یاد دہانی',
    holdHintText: 'کہیں بھی 3 سیکنڈ دبائے رکھیں، یا کہیں "میں نے لے لی"',
    holdToConfirm: 'تصدیق کے لیے دبائے رکھیں',
    keepHolding: 'دبائے رکھیں...',
    confirmedText: 'تصدیق ہو گئی!',
    speechPrefix: 'لینے کا وقت ہو گیا: '
  }
}

function getT() {
  var showEnglishText = document.getElementById('englishToggle').checked
  return showEnglishText ? translations.en : (translations[selectedLanguage] || translations.en)
}

function applyTranslations(langCode) {
  var t = getT()

  document.getElementById('medScreenLabel').textContent = t.medScreenLabel
  document.getElementById('medNameInput').placeholder = t.medNamePlaceholder
  document.getElementById('medDosageInput').placeholder = t.medDosagePlaceholder
  document.getElementById('medCountInput').placeholder = t.medCountPlaceholder
  document.getElementById('daysLabel').textContent = t.daysLabel
  document.getElementById('freqLabel').textContent = t.freqLabel
  document.getElementById('notesLabel').textContent = t.notesLabel
  document.getElementById('medNotesInput').placeholder = t.notesPlaceholder
  document.getElementById('medError').textContent = t.medErrorText
  document.getElementById('medNextBtn').textContent = t.medNextBtn
  document.getElementById('reminderLabel').textContent = t.reminderLabel
  document.getElementById('holdHintText').textContent = t.holdHintText
  document.getElementById('holdLabel').textContent = t.holdToConfirm

  document.querySelectorAll('.day-btn').forEach(function(btn) {
    btn.textContent = t.days[btn.getAttribute('data-day')]
  })

  document.querySelector('.freq-btn[data-freq="weekly"]').textContent = t.weekly
  document.querySelector('.freq-btn[data-freq="biweekly"]').textContent = t.biweekly
  document.querySelector('.freq-btn[data-freq="monthly"]').textContent = t.monthly
}

// ===== END LANGUAGE / TRANSLATION SYSTEM =====

document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.remove('selected')
    })
    btn.classList.add('selected')
    document.getElementById('langError').style.display = 'none'
  })
})

document.getElementById('langNextBtn').addEventListener('click', function() {
  var selectedLangBtn = document.querySelector('.lang-btn.selected')
  var langError = document.getElementById('langError')

  if (!selectedLangBtn) {
    langError.style.display = 'block'
    return
  }

  langError.style.display = 'none'
  selectedLanguage = selectedLangBtn.getAttribute('data-lang')
  applyTranslations(selectedLanguage)

  document.getElementById('languageScreen').style.display = 'none'
  document.getElementById('medicineScreen').style.display = 'flex'
})

document.getElementById('englishToggle').addEventListener('change', function() {
  applyTranslations(selectedLanguage)
})

document.querySelectorAll('.day-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.classList.toggle('selected')
    document.getElementById('medError').style.display = 'none'
  })
})

document.querySelectorAll('.freq-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.freq-btn').forEach(function(b) {
      b.classList.remove('selected')
    })
    btn.classList.add('selected')
  })
})

;['medNameInput', 'medDosageInput', 'medCountInput', 'medTimeInput'].forEach(function(id) {
  document.getElementById(id).addEventListener('input', function() {
    document.getElementById('medError').style.display = 'none'
  })
})

// ===== MEDICINE DATA + COUNTDOWN =====

var medicineData = {}
var medicines = []
var currentMedicineIndex = 0
var countdownInterval = null
var nextReminderDate = null

var dayIndexMap = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 }

function getNextReminderDate(days, timeStr) {
  var parts = timeStr.split(':')
  var hours = parseInt(parts[0])
  var minutes = parseInt(parts[1])
  var selectedDayNums = days.map(function(d) { return dayIndexMap[d] })
  var now = new Date()

  for (var i = 0; i < 8; i++) {
    var candidate = new Date(now)
    candidate.setDate(now.getDate() + i)
    candidate.setHours(hours, minutes, 0, 0)
    if (candidate > now && selectedDayNums.indexOf(candidate.getDay()) !== -1) {
      return candidate
    }
  }
  return null
}

function formatCountdown(ms) {
  if (ms <= 0) return '0s'
  var totalSeconds = Math.floor(ms / 1000)
  var hours = Math.floor(totalSeconds / 3600)
  var minutes = Math.floor((totalSeconds % 3600) / 60)
  var seconds = totalSeconds % 60

  if (hours > 0) {
    return hours + 'h ' + minutes + 'm'
  } else if (minutes > 0) {
    return minutes + 'm ' + seconds + 's'
  } else {
    return seconds + 's'
  }
}
function updateCountdownDisplay(ms) {
  var totalSeconds = Math.max(0, Math.floor(ms / 1000))
  var hours = Math.floor(totalSeconds / 3600)
  var minutes = Math.floor((totalSeconds % 3600) / 60)
  document.getElementById('countdownHours').textContent = hours
  document.getElementById('countdownMins').textContent = minutes
}

function playChime() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)()
    var notes = [523, 659, 784]
    notes.forEach(function(freq, i) {
      var osc = ctx.createOscillator()
      var gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      var startTime = ctx.currentTime + (i * 0.35)
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9)
      osc.start(startTime)
      osc.stop(startTime + 0.9)
    })
    return (notes.length * 0.35) + 0.9
  } catch (e) {
    return 0
  }
}

function speakReminder() {
  var t = getT()
  var speechText = t.speechPrefix + medicineData.name
  if (medicineData.notes && medicineData.notes.trim() !== '') {
    speechText += '. ' + medicineData.notes
  }
  var speech = new SpeechSynthesisUtterance(speechText)
  speech.lang = speechLangMap[selectedLanguage] || 'en-US'
  speech.rate = 0.85
  speech.pitch = 1.05
  window.speechSynthesis.speak(speech)
}
var voiceConfirmWords = {
  en: ['yes', 'yeah', 'yep'],
  hi: ['हाँ', 'हां', 'haan', 'han'],
  es: ['sí', 'si'],
  ar: ['نعم', 'naam'],
  fr: ['oui'],
  zh: ['是', 'shi', '对'],
  pt: ['sim'],
  ru: ['да', 'da'],
  ja: ['はい', 'hai'],
  ko: ['네', 'ne', '예'],
  de: ['ja'],
  it: ['sì', 'si'],
  tr: ['evet'],
  vi: ['có', 'co'],
  tl: ['oo'],
  ur: ['ہاں', 'haan', 'han']
}

var confirmationPhrases = {
  en: 'Good job, medicine taken',
  hi: 'शाबाश, दवाई ले ली',
  es: 'Muy bien, medicamento tomado',
  ar: 'أحسنت، تم أخذ الدواء',
  fr: 'Bien fait, médicament pris',
  zh: '很好，药已服用',
  pt: 'Muito bem, medicamento tomado',
  ru: 'Отлично, лекарство принято',
  ja: 'よくできました、薬を飲みました',
  ko: '잘했어요, 약을 먹었어요',
  de: 'Gut gemacht, Medikament eingenommen',
  it: 'Ottimo, medicinale preso',
  tr: 'Aferin, ilaç alındı',
  vi: 'Giỏi lắm, đã uống thuốc',
  tl: 'Magaling, nainom na ang gamot',
  ur: 'شاباش، دوائی لے لی'
}

var recognition = null
var isListening = false

function speakConfirmation() {
  var phrase = confirmationPhrases[selectedLanguage] || confirmationPhrases.en
  var speech = new SpeechSynthesisUtterance(phrase)
  speech.lang = speechLangMap[selectedLanguage] || 'en-US'
  speech.rate = 0.85
  speech.pitch = 1.05
  window.speechSynthesis.speak(speech)
}

function startVoiceListening() {
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) return
  if (isListening) return

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SpeechRecognition()
  recognition.lang = speechLangMap[selectedLanguage] || 'en-US'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = function(event) {
    var heard = event.results[0][0].transcript.toLowerCase().trim()
    var confirmWords = voiceConfirmWords[selectedLanguage] || voiceConfirmWords.en

    var matched = confirmWords.some(function(word) {
      return heard.includes(word.toLowerCase())
    })

    if (matched) {
      stopVoiceListening()
      triggerVoiceConfirm()
    } else {
      // Didn't hear the right word, listen again
      startVoiceListening()
    }
  }

  recognition.onerror = function() {
    isListening = false
  }

  recognition.onend = function() {
    isListening = false
    // Keep listening if reminder is still active and not confirmed
    if (!isConfirmed && document.getElementById('dueState').style.display !== 'none') {
      startVoiceListening()
    }
  }

  isListening = true
  recognition.start()
}

function stopVoiceListening() {
  if (recognition) {
    recognition.stop()
    recognition = null
  }
  isListening = false
}

function triggerVoiceConfirm() {
  if (isConfirmed) return
  isConfirmed = true
  holdZone.classList.remove('holding')
  holdZone.classList.add('confirmed')
  document.getElementById('holdLabel').textContent = getT().confirmedText
  if (navigator.vibrate) navigator.vibrate([100, 50, 100])
  speakConfirmation()

  setTimeout(function() {
    holdZone.classList.remove('confirmed')
    var soonest = null
    var soonestDate = null
    medicines.forEach(function(med) {
      var nextDate = getNextReminderDate(med.days, med.time)
      if (nextDate && (!soonestDate || nextDate < soonestDate)) {
        soonest = med
        soonestDate = nextDate
      }
    })
    if (soonest) medicineData = soonest
    startCountdown()
  }, 3000)
}

function fireReminder() {
  // Switch to due state
  document.getElementById('countdownState').style.display = 'none'
  document.getElementById('dueState').style.display = 'block'

  // Fill in due state content
  document.getElementById('dueMedName').textContent = medicineData.name
  document.getElementById('dueMedDosage').textContent = medicineData.dosage + ' tablet(s)'

  var notesEl = document.getElementById('nextMedNotes')
  if (medicineData.notes && medicineData.notes.trim() !== '') {
    notesEl.textContent = medicineData.notes
    notesEl.style.display = 'block'
  } else {
    notesEl.style.display = 'none'
  }

  // Reset hold zone
  isConfirmed = false
  holdZone.classList.remove('holding', 'confirmed')
  document.getElementById('holdLabel').textContent = getT().holdToConfirm

  // Vibrate
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200])

  // Chime then speak
  var chimeDuration = playChime()
  setTimeout(function() {
    speakReminder()
    setTimeout(function() {
      startVoiceListening()
    }, 2000)
  }, (chimeDuration * 1000) + 300)
}


function startCountdown() {
  stopVoiceListening()
  if (countdownInterval) clearInterval(countdownInterval)
  nextReminderDate = getNextReminderDate(medicineData.days, medicineData.time)

  document.getElementById('countdownState').style.display = 'block'
  document.getElementById('dueState').style.display = 'none'

  document.getElementById('nextMedName').textContent = medicineData.name
  if (nextReminderDate) {
    document.getElementById('nextMedTime').textContent = nextReminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!nextReminderDate) {
    document.getElementById('countdownHours').textContent = '0'
    document.getElementById('countdownMins').textContent = '0'
    return
  }

  countdownInterval = setInterval(function() {
    var diff = nextReminderDate - new Date()
    if (diff <= 0) {
      clearInterval(countdownInterval)
      updateCountdownDisplay(0)
      fireReminder()
      return
    }
    updateCountdownDisplay(diff)
  }, 1000)

  updateCountdownDisplay(nextReminderDate - new Date())
}

function showCheckOverlay() {
  var overlay = document.getElementById('checkOverlay')

  document.getElementById('checkMedName').textContent = medicineData.name
  document.getElementById('checkMedDosage').textContent = medicineData.dosage + ' tablet(s)'
  document.getElementById('checkNextTime').textContent = nextReminderDate
    ? 'Next: ' + nextReminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  var notesEl = document.getElementById('checkMedNotes')
  if (medicineData.notes && medicineData.notes.trim() !== '') {
    notesEl.textContent = medicineData.notes
    notesEl.style.display = 'block'
  } else {
    notesEl.style.display = 'none'
  }

  overlay.style.display = 'flex'

  var dismissTimer = setTimeout(function() {
    overlay.style.display = 'none'
  }, 4000)

  overlay.onclick = function() {
    clearTimeout(dismissTimer)
    overlay.style.display = 'none'
  }
}

document.getElementById('countdownMedCard').addEventListener('click', function() {
  showCheckOverlay()
})

// ===== END MEDICINE DATA + COUNTDOWN =====

document.getElementById('medNextBtn').addEventListener('click', function() {
  var medName = document.getElementById('medNameInput').value.trim()
  var medDosage = document.getElementById('medDosageInput').value.trim()
  var medCount = document.getElementById('medCountInput').value.trim()
  var medTime = document.getElementById('medTimeInput').value.trim()
  var selectedDays = document.querySelectorAll('.day-btn.selected')
  var medError = document.getElementById('medError')

if (medName === '' || medDosage === '' || medCount === '' || medTime === '' || selectedDays.length === 0 || Number(medDosage) < 1 || Number(medCount) < 1) {
  medError.style.display = 'block'
  return
}

var duplicate = medicines.some(function(m) {
  return m.name.toLowerCase().trim() === medName.toLowerCase().trim()
})

if (duplicate) {
  medError.textContent = 'This medicine has already been added'
  medError.style.display = 'block'
  return
}

medError.style.display = 'none'

var daysArr = []
selectedDays.forEach(function(btn) {
  daysArr.push(btn.getAttribute('data-day'))
})

medicineData = {
  name: medName,
  dosage: medDosage,
  count: medCount,
  time: medTime,
  notes: document.getElementById('medNotesInput').value,
  days: daysArr
}

medicines.push(medicineData)
document.getElementById('medicineScreen').style.display = 'none'
document.getElementById('medicineAddedScreen').style.display = 'flex'
})

document.getElementById('addAnotherBtn').addEventListener('click', function() {
  document.getElementById('medNameInput').value = ''
  document.getElementById('medDosageInput').value = ''
  document.getElementById('medCountInput').value = ''
  document.getElementById('medTimeInput').value = ''
  document.getElementById('medNotesInput').value = ''
  document.getElementById('medError').style.display = 'none'
  document.querySelectorAll('.day-btn.selected').forEach(function(btn) {
    btn.classList.remove('selected')
  })
  document.getElementById('medicineAddedScreen').style.display = 'none'
  document.getElementById('medicineScreen').style.display = 'flex'
})

document.getElementById('doneAddingBtn').addEventListener('click', function() {
  var soonest = null
  var soonestDate = null
  medicines.forEach(function(med) {
  var nextDate = getNextReminderDate(med.days, med.time)
  if (nextDate && (!soonestDate || nextDate < soonestDate)) {
    soonest = med
    soonestDate = nextDate
  }
})
if (soonest) medicineData = soonest
  document.getElementById('medicineAddedScreen').style.display = 'none'
  document.getElementById('patientHomeScreen').style.display = 'flex'
  startCountdown()
})

// ===== HOLD ZONE =====

var holdTimer = null
var holdZone = document.getElementById('holdZone')
var HOLD_DURATION = 3000
var isConfirmed = false

holdZone.addEventListener('pointerdown', function() {
  if (isConfirmed) return
  var t = getT()

  holdZone.style.setProperty('--fill-duration', HOLD_DURATION + 'ms')
  holdZone.classList.add('holding')
  document.getElementById('holdLabel').textContent = t.keepHolding
  if (navigator.vibrate) navigator.vibrate(50)

  holdTimer = setTimeout(function() {
    isConfirmed = true
    holdZone.classList.remove('holding')
    holdZone.classList.add('confirmed')
    document.getElementById('holdLabel').textContent = t.confirmedText
    if (navigator.vibrate) navigator.vibrate([100, 50, 100])

    // After 2 seconds, go back to countdown for next reminder
    setTimeout(function() {
      holdZone.classList.remove('confirmed')
      // Find the medicine with the soonest next reminder
    var soonest = null
    var soonestDate = null
    medicines.forEach(function(med) {
      var nextDate = getNextReminderDate(med.days, med.time)
  if (nextDate && (!soonestDate || nextDate < soonestDate)) {
    soonest = med
    soonestDate = nextDate
  }
})
if (soonest) medicineData = soonest
      startCountdown()
    }, 2000)
  }, HOLD_DURATION)
})

holdZone.addEventListener('pointerup', function() {
  clearTimeout(holdTimer)
  if (!isConfirmed) {
    holdZone.classList.remove('holding')
    document.getElementById('holdLabel').textContent = getT().holdToConfirm
  }
})

holdZone.addEventListener('pointercancel', function() {
  clearTimeout(holdTimer)
  if (!isConfirmed) {
    holdZone.classList.remove('holding')
    document.getElementById('holdLabel').textContent = getT().holdToConfirm
  }
})