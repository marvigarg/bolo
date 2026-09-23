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

// ===== VOICE WORDS =====
// Matched as whole words (except zh/ja, which don't use spaces).
// Includes the phrase each language's holdHintText tells the patient to say.
var voiceConfirmWords = {
  en: ['yes', 'yeah', 'yep', 'i took it', 'took it', 'done'],
  hi: ['हाँ', 'हां', 'हा', 'ले ली', 'ले लिया', 'ली'],
  es: ['sí', 'si', 'lo tomé', 'tomé'],
  ar: ['نعم', 'أجل', 'تناولته'],
  fr: ['oui', 'pris'],
  zh: ['是', '对', '吃了', '好了'],
  pt: ['sim', 'tomei'],
  ru: ['да', 'принял', 'приняла'],
  ja: ['はい', '飲みました'],
  ko: ['네', '예', '먹었어요', '먹었어'],
  de: ['ja', 'genommen'],
  it: ['sì', 'si', 'preso', 'presa'],
  tr: ['evet', 'aldım'],
  vi: ['có', 'rồi', 'đã uống'],
  tl: ['oo', 'opo', 'nainom'],
  ur: ['ہاں', 'جی', 'لے لی']
}

// If any of these are heard, it's not a confirmation ("no, I didn't take it")
var voiceNegativeWords = {
  en: ['no', 'not', "didn't", 'didnt', "haven't", 'havent', 'never'],
  hi: ['नहीं', 'ना', 'नही'],
  es: ['no', 'todavía'],
  ar: ['لا', 'لم'],
  fr: ['non', 'pas'],
  zh: ['没', '不'],
  pt: ['não', 'nao'],
  ru: ['нет', 'не'],
  ja: ['いいえ', 'ません', 'まだ'],
  ko: ['아니', '아니요', '안', '아직'],
  de: ['nein', 'nicht', 'noch'],
  it: ['no', 'non'],
  tr: ['hayır', 'hayir', 'değil'],
  vi: ['không', 'chưa'],
  tl: ['hindi', 'wala'],
  ur: ['نہیں', 'نہ']
}

// Spoken in the patient's language no matter what language the screen shows
var voicePhrases = {
  en: { tablets: 'tablets', askConfirm: 'Say yes once you have taken it.', nextMedicine: 'Your next medicine is' },
  hi: { tablets: 'गोलियाँ', askConfirm: 'दवा लेने के बाद हाँ बोलिए।', nextMedicine: 'आपकी अगली दवा है' },
  es: { tablets: 'pastillas', askConfirm: 'Diga sí cuando la haya tomado.', nextMedicine: 'Su próximo medicamento es' },
  ar: { tablets: 'أقراص', askConfirm: 'قل نعم بعد أن تتناوله.', nextMedicine: 'دواؤك التالي هو' },
  fr: { tablets: 'comprimés', askConfirm: 'Dites oui quand vous l\'avez pris.', nextMedicine: 'Votre prochain médicament est' },
  zh: { tablets: '片', askConfirm: '吃完后请说"是"。', nextMedicine: '您的下一个药是' },
  pt: { tablets: 'comprimidos', askConfirm: 'Diga sim quando tiver tomado.', nextMedicine: 'O seu próximo medicamento é' },
  ru: { tablets: 'таблетки', askConfirm: 'Скажите «да», когда примете.', nextMedicine: 'Ваше следующее лекарство' },
  ja: { tablets: '錠', askConfirm: '飲んだら「はい」と言ってください。', nextMedicine: '次のお薬は' },
  ko: { tablets: '알', askConfirm: '드신 후에 "네"라고 말씀해 주세요.', nextMedicine: '다음 약은' },
  de: { tablets: 'Tabletten', askConfirm: 'Sagen Sie ja, wenn Sie es genommen haben.', nextMedicine: 'Ihr nächstes Medikament ist' },
  it: { tablets: 'compresse', askConfirm: 'Dica sì quando l\'ha presa.', nextMedicine: 'Il suo prossimo medicinale è' },
  tr: { tablets: 'tablet', askConfirm: 'Aldıktan sonra evet deyin.', nextMedicine: 'Sıradaki ilacınız' },
  vi: { tablets: 'viên', askConfirm: 'Uống xong thì nói có nhé.', nextMedicine: 'Thuốc tiếp theo của bạn là' },
  tl: { tablets: 'tableta', askConfirm: 'Sabihin ang oo kapag nainom mo na.', nextMedicine: 'Ang susunod mong gamot ay' },
  ur: { tablets: 'گولیاں', askConfirm: 'دوا لینے کے بعد ہاں کہیں۔', nextMedicine: 'آپ کی اگلی دوا ہے' }
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
