// Rosary Prayer App - Main Application Logic

class RosaryApp {
    constructor() {
        this.currentMystery = null;
        this.currentPrayerIndex = 0;
        this.prayers = [];
        this.voiceEnabled = true;
        this.recognition = null;
        this.isListening = false;
        
        // Mystery data with images, scriptures, and prayers
        this.mysteries = {
            joyful: {
                name: "Joyful Mysteries",
                color: "#4facfe",
                image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop",
                mysteries: [
                    {
                        title: "The Annunciation",
                        scripture: "And the angel said to her, 'Do not be afraid, Mary, for you have found favor with God. And behold, you will conceive in your womb and bear a son, and you shall call his name Jesus.' (Luke 1:30-31)",
                        image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Visitation",
                        scripture: "And when Elizabeth heard the greeting of Mary, the baby leaped in her womb. And Elizabeth was filled with the Holy Spirit. (Luke 1:41)",
                        image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Nativity",
                        scripture: "And she gave birth to her firstborn son and wrapped him in swaddling cloths and laid him in a manger. (Luke 2:7)",
                        image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Presentation",
                        scripture: "And when the time came for their purification according to the Law of Moses, they brought him up to Jerusalem to present him to the Lord. (Luke 2:22)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    },
                    {
                        title: "Finding in the Temple",
                        scripture: "After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions. (Luke 2:46)",
                        image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop"
                    }
                ]
            },
            sorrowful: {
                name: "Sorrowful Mysteries",
                color: "#ff9a9e",
                image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=400&fit=crop",
                mysteries: [
                    {
                        title: "The Agony in the Garden",
                        scripture: "And being in agony he prayed more earnestly; and his sweat became like great drops of blood falling down to the ground. (Luke 22:44)",
                        image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Scourging at the Pillar",
                        scripture: "Then Pilate took Jesus and flogged him. And the soldiers twisted together a crown of thorns and put it on his head. (John 19:1-2)",
                        image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Crowning with Thorns",
                        scripture: "They stripped him and put a scarlet robe on him, and twisting together a crown of thorns, they put it on his head. (Matthew 27:28-29)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Carrying of the Cross",
                        scripture: "And he went out, bearing his own cross, to the place called The Place of a Skull, which in Aramaic is called Golgotha. (John 19:17)",
                        image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Crucifixion",
                        scripture: "And when they came to the place that is called The Skull, there they crucified him. (Luke 23:33)",
                        image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=400&fit=crop"
                    }
                ]
            },
            luminous: {
                name: "Luminous Mysteries",
                color: "#ffffff",
                image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop",
                mysteries: [
                    {
                        title: "The Baptism in the Jordan",
                        scripture: "And when Jesus was baptized, immediately he went up from the water, and behold, the heavens were opened to him. (Matthew 3:16)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Wedding at Cana",
                        scripture: "On the third day there was a wedding at Cana in Galilee, and the mother of Jesus was there. (John 2:1)",
                        image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Proclamation of the Kingdom",
                        scripture: "Now after John was arrested, Jesus came into Galilee, proclaiming the gospel of God. (Mark 1:14)",
                        image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Transfiguration",
                        scripture: "And as he was praying, the appearance of his face was altered, and his clothing became dazzling white. (Luke 9:29)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Institution of the Eucharist",
                        scripture: "And he took bread, and when he had given thanks, he broke it and gave it to them, saying, 'This is my body.' (Luke 22:19)",
                        image: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=600&h=400&fit=crop"
                    }
                ]
            },
            glorious: {
                name: "Glorious Mysteries",
                color: "#fddb92",
                image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop",
                mysteries: [
                    {
                        title: "The Resurrection",
                        scripture: "But the angel said to the women, 'Do not be afraid, for I know that you seek Jesus who was crucified. He is not here, for he has risen.' (Matthew 28:5-6)",
                        image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Ascension",
                        scripture: "And when he had said these things, as they were looking on, he was lifted up, and a cloud took him out of their sight. (Acts 1:9)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Descent of the Holy Spirit",
                        scripture: "And suddenly there came from heaven a sound like a mighty rushing wind, and it filled the entire house where they were sitting. (Acts 2:2)",
                        image: "https://images.unsplash.com/photo-1544211184-9e61f4535a2b?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Assumption",
                        scripture: "Henceforth all generations will call me blessed; for he who is mighty has done great things for me. (Luke 1:48-49)",
                        image: "https://images.unsplash.com/photo-1507643179173-617d654551a3?w=600&h=400&fit=crop"
                    },
                    {
                        title: "The Coronation",
                        scripture: "A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet and a crown of twelve stars on her head. (Revelation 12:1)",
                        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop"
                    }
                ]
            }
        };

        // Trinity image for Glory Be and Fatima prayer
        this.trinityImage = "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop";

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
    }

    setupEventListeners() {
        // Mystery selection
        document.querySelectorAll('.mystery-diamond').forEach(diamond => {
            diamond.addEventListener('click', () => {
                const mystery = diamond.getAttribute('data-mystery');
                this.selectMystery(mystery);
            });
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showScreen('main-menu');
        });

        // Next prayer button
        document.getElementById('next-prayer-btn').addEventListener('click', () => {
            this.nextPrayer();
        });

        // New rosary button
        document.getElementById('new-rosary-btn').addEventListener('click', () => {
            this.showScreen('main-menu');
        });

        // Voice toggle
        document.getElementById('voice-enabled').addEventListener('change', (e) => {
            this.voiceEnabled = e.target.checked;
            if (this.voiceEnabled) {
                this.startListening();
            } else {
                this.stopListening();
            }
        });
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('')
                    .toLowerCase();

                // Display the transcript for user feedback
                this.displayTranscript(transcript);
                
                this.checkPrayerCompletion(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.updateVoiceStatus('Error - Click Next manually', 'error');
            };

            this.recognition.onend = () => {
                if (this.voiceEnabled && this.isListening) {
                    try {
                        this.recognition.start();
                    } catch(e) {
                        console.log('Recognition restart failed:', e);
                    }
                }
            };
        } else {
            console.warn('Speech recognition not supported');
            document.getElementById('voice-status-text').textContent = 'Voice not supported - use button';
        }
    }

    displayTranscript(transcript) {
        let transcriptDiv = document.getElementById('transcript-display');
        if (!transcriptDiv) {
            transcriptDiv = document.createElement('div');
            transcriptDiv.id = 'transcript-display';
            transcriptDiv.className = 'transcript-display';
            const voiceStatus = document.getElementById('voice-status');
            voiceStatus.parentNode.insertBefore(transcriptDiv, voiceStatus.nextSibling);
        }
        transcriptDiv.textContent = `"${transcript}"`;
    }

    checkPrayerCompletion(transcript) {
        const currentPrayer = this.prayers[this.currentPrayerIndex];
        
        // Keywords to detect prayer completion - more flexible matching
        const prayerKeywords = {
            'our_father': ['our father', 'father our', 'in heaven', 'hallowed be'],
            'hail_mary': ['hail mary', 'full of grace', 'blessed art thou', 'holy mary'],
            'glory_be': ['glory be', 'glory to the father', 'as it was in the beginning'],
            'fatima': ['o my jesus', 'forgive us', 'save us from the fires'],
            'apostles_creed': ['i believe', 'creed', 'god the father almighty'],
            'hail_holy_queen': ['hail holy queen', 'mother of mercy'],
            'mystery_announcement': [] // No keywords needed, just advance manually
        };

        const keywords = prayerKeywords[currentPrayer.type];
        if (keywords && keywords.length > 0 && keywords.some(keyword => transcript.includes(keyword))) {
            this.updateVoiceStatus('✓ Prayer Detected!', 'detected');
            
            // Auto-advance after short delay
            setTimeout(() => {
                this.nextPrayer();
            }, 2000);
        } else if (keywords && keywords.length === 0) {
            // For mystery announcements, don't auto-detect
            this.updateVoiceStatus('Listening... (click Next to continue)', 'listening');
        }
    }

    selectMystery(mysteryType) {
        this.currentMystery = this.mysteries[mysteryType];
        this.generatePrayerSequence(mysteryType);
        this.currentPrayerIndex = 0;
        
        document.getElementById('current-mystery-name').textContent = this.currentMystery.name;
        this.showScreen('prayer-screen');
        this.displayCurrentPrayer();
        
        if (this.voiceEnabled) {
            this.startListening();
        }
    }

    generatePrayerSequence(mysteryType) {
        const prayers = [];
        
        // Opening prayers with complete text
        prayers.push({ 
            type: 'apostles_creed', 
            title: "The Apostles' Creed", 
            text: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen." 
        });
        prayers.push({ 
            type: 'our_father', 
            title: "Our Father", 
            text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." 
        });
        prayers.push({ 
            type: 'hail_mary', 
            title: "Hail Mary (1st)", 
            text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
            scripture: "For the increase of Faith - Hebrews 11:1"
        });
        prayers.push({ 
            type: 'hail_mary', 
            title: "Hail Mary (2nd)", 
            text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
            scripture: "For the increase of Hope - Romans 15:13"
        });
        prayers.push({ 
            type: 'hail_mary', 
            title: "Hail Mary (3rd)", 
            text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
            scripture: "For the increase of Charity - 1 Corinthians 13:13"
        });
        prayers.push({ 
            type: 'glory_be', 
            title: "Glory Be", 
            text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen." 
        });

        // Five decades
        const mystery = this.mysteries[mysteryType];
        for (let i = 0; i < 5; i++) {
            prayers.push({ 
                type: 'mystery_announcement', 
                title: `${i + 1}. ${mystery.mysteries[i].title}`,
                scripture: mystery.mysteries[i].scripture,
                image: mystery.mysteries[i].image
            });
            prayers.push({ type: 'our_father', title: "Our Father", text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." });
            
            // 10 Hail Marys per decade with unique scriptures
            const decadeScriptures = [
                "The Annunciation - Luke 1:26-38",
                "Mary's Fiat - Luke 1:38",
                "The Visitation - Luke 1:39-45",
                "The Magnificat - Luke 1:46-55",
                "The Nativity - Luke 2:1-7",
                "The Shepherds - Luke 2:8-20",
                "The Presentation - Luke 2:22-35",
                "Simeon's Prophecy - Luke 2:34-35",
                "Finding in the Temple - Luke 2:41-52",
                "Jesus' Growth - Luke 2:52"
            ];
            
            for (let j = 0; j < 10; j++) {
                prayers.push({ 
                    type: 'hail_mary', 
                    title: `Hail Mary ${j + 1}/10`, 
                    text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
                    scripture: decadeScriptures[j]
                });
            }
            
            prayers.push({ type: 'glory_be', title: "Glory Be", text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen." });
            prayers.push({ type: 'fatima', title: "Fatima Prayer", text: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy. Amen." });
        }

        // Closing prayers with complete text
        prayers.push({ 
            type: 'hail_holy_queen', 
            title: "Hail Holy Queen", 
            text: "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us; and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen." 
        });
        prayers.push({ 
            type: 'concluding_prayer', 
            title: "Concluding Prayer", 
            text: "O God, whose only begotten Son, by his life, Death, and Resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen." 
        });

        this.prayers = prayers;
        this.generateBeads();
    }

    generateBeads() {
        const beadsContainer = document.getElementById('rosary-beads');
        beadsContainer.innerHTML = '';
        
        this.prayers.forEach((prayer, index) => {
            if (prayer.type === 'hail_mary' || prayer.type === 'our_father' || prayer.type === 'glory_be') {
                const bead = document.createElement('div');
                bead.className = 'bead';
                bead.id = `bead-${index}`;
                beadsContainer.appendChild(bead);
            }
        });
    }

    displayCurrentPrayer() {
        const prayer = this.prayers[this.currentPrayerIndex];
        
        document.getElementById('prayer-title').textContent = prayer.title;
        document.getElementById('current-prayer-image').src = prayer.image || this.currentMystery.image;
        document.getElementById('prayer-text').textContent = prayer.text || '';
        
        // Show scripture for Hail Marys during mysteries
        if (prayer.scripture) {
            document.getElementById('scripture-reading').innerHTML = `<strong>Meditation:</strong><br>${prayer.scripture}`;
            document.getElementById('scripture-reading').style.display = 'block';
        } else {
            document.getElementById('scripture-reading').style.display = 'none';
        }

        // Show Trinity image for Glory Be and Fatima
        if (prayer.type === 'glory_be' || prayer.type === 'fatima') {
            document.getElementById('current-prayer-image').src = this.trinityImage;
        }

        this.updateBeads();
        this.updateVoiceStatus('Listening...', 'listening');
    }

    updateBeads() {
        document.querySelectorAll('.bead').forEach((bead, index) => {
            bead.classList.remove('current', 'completed');
            if (index < this.currentPrayerIndex) {
                bead.classList.add('completed');
            } else if (index === this.currentPrayerIndex) {
                bead.classList.add('current');
            }
        });
    }

    nextPrayer() {
        this.currentPrayerIndex++;
        
        if (this.currentPrayerIndex >= this.prayers.length) {
            this.completeRosary();
        } else {
            this.displayCurrentPrayer();
        }
    }

    completeRosary() {
        this.stopListening();
        this.showScreen('completion-screen');
    }

    startListening() {
        if (this.recognition && this.voiceEnabled) {
            try {
                this.isListening = true;
                this.recognition.start();
                this.updateVoiceStatus('Listening...', 'listening');
            } catch (e) {
                console.error('Error starting recognition:', e);
            }
        }
    }

    stopListening() {
        if (this.recognition) {
            this.isListening = false;
            this.recognition.stop();
        }
    }

    updateVoiceStatus(text, status) {
        const statusElement = document.getElementById('voice-status');
        const textElement = document.getElementById('voice-status-text');
        
        textElement.textContent = text;
        statusElement.className = 'voice-status';
        if (status) {
            statusElement.classList.add(status);
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rosaryApp = new RosaryApp();
});
