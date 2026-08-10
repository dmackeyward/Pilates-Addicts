<script lang="ts">
    import '../style.css'; // if you have global styles
    let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="bg-white border-b border-gray-200 p-4 shadow-sm">
        <nav class="max-w-4xl mx-auto flex gap-6 font-medium text-sm">
            <a href="/exercises" class="hover:text-blue-600">Exercises</a>
            <a href="/lessons" class="hover:text-blue-600">Lessons</a>
        </nav>
    </header>

    <main>
        {@render children()}
    </main>
</div>